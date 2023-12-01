const functions = require('firebase-functions');
const { setGlobalOptions } = require("firebase-functions/v2")
const admin = require('firebase-admin');
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { onDocumentWritten } = require("firebase-functions/v2/firestore");

admin.initializeApp();

// Set the maximum instances to 10 for all functions
setGlobalOptions({ maxInstances: 10 });

let canUseAppCode = "true"

exports.changeCanUseAppValue = functions.region("southamerica-east1").https.onRequest((request, response) => {
  canUseAppCode = request.query.newValue
});

exports.canUseApp = functions.region("southamerica-east1").https.onRequest((request, response) => {
  response.json({ response: canUseAppCode });
});

exports.clearDatabase = onSchedule("every day 04:00", async () => {
  const firestore = admin.firestore()

  const batch = firestore.batch();

  const date = new Date();
  const currentMonth = +date.getMonth() + 1;
  const currentYear = +date.getFullYear();
  const currentDay = +date.getDate();

  const removePastDays = async () => {
    const docToRemove = `${currentMonth}_${currentYear}`

    const barbersRef = firestore.collection("barbers");
    const barbersUid = (await barbersRef.get()).docs.map(doc => doc.id);

    const schedulesMonthRef = firestore.collection("schedules_month").doc(docToRemove);
    const unavailableTimesRef = firestore.collection("unavailable_times").doc(docToRemove);
    const schedulesUidRef = firestore.collection("schedules_uid").doc(docToRemove);
    const schedulesByUserRef = firestore.collection("schedules_by_user");

    const schedulesMonthData = (await schedulesMonthRef.get()).data()
    const unavailableTimesData = (await unavailableTimesRef.get()).data()
    const schedulesUidData = (await schedulesUidRef.get()).data().schedules
    const schedulesByUserData = (await schedulesByUserRef.get()).docs.map(doc => doc.data().schedules)

    for (const day in schedulesMonthData) {
      if (+day < currentDay) delete schedulesMonthData[day]
    }

    for (const day in unavailableTimesData) {
      if (+day < currentDay) delete unavailableTimesData[day]
    }

    for (const schedule of schedulesUidData) {
      const [year, month, day] = schedule.split("-").splice(1, 4)
      if (+day < currentDay) delete schedulesUidData[schedule]
    }

    for (const barber of barbersUid) {
      const blockedTimesRef = firestore.collection("blocked_times").doc(barber);
      const daysBlockedRef = firestore.collection("days_blocked").doc(barber);

      const blockedTimesData = (await blockedTimesRef.get()).data()
      const daysBlockedData = (await daysBlockedRef.get()).data()

      if (blockedTimesData !== undefined) {
        for (const date in blockedTimesData) {
          const [year, month, day] = date.split("-")
          if (+day < currentDay) delete blockedTimesData[date]
        }

        batch.set(blockedTimesRef, { ...blockedTimesData })
      }

      if (daysBlockedRef) {
        for (const date in daysBlockedData) {
          const [year, month, day] = date.split("-")
          if (+day < currentDay) delete daysBlockedData[date]
        }

        batch.set(daysBlockedRef, { ...daysBlockedData })
      }
    }

    const schedulesByUserDataUpdated = schedulesByUserData.filter(schedule => {
      const [year, month, day] = schedule.day.split("-")

      if (+year < currentYear) return false;
      if (+month < currentMonth && +year === currentYear) return false;
      if (+day < currentDay && +month === currentMonth && +year === currentYear) return false;

      return true
    })

    batch.set(schedulesMonthRef, schedulesMonthData)
    batch.set(unavailableTimesRef, unavailableTimesData)
    batch.set(schedulesUidRef, {
      schedules: schedulesUidData
    })
    batch.set(schedulesByUserRef, {
      schedules: schedulesByUserDataUpdated
    })

    await batch.commit();
  }

  const removePastMonths = async () => {
    let docToRemove = null

    if (currentMonth === 1) docToRemove = `12_${currentYear - 1}`
    else if (currentMonth < 10) docToRemove = `0${currentMonth}_${currentYear}`
    else docToRemove = `${currentMonth}_${currentYear}`

    const schedulesMonthRef = firestore.collection("schedules_month").doc(docToRemove);
    const unavailableTimesRef = firestore.collection("unavailable_times").doc(docToRemove);
    const schedulesUidRef = firestore.collection("schedules_uid").doc(docToRemove);

    batch.delete(schedulesMonthRef)
    batch.delete(unavailableTimesRef)
    batch.delete(schedulesUidRef)

    await batch.commit()
  }

  await removePastDays()
  if (currentDay === 1) await removePastMonths();
});

exports.updateDefaultWorkTimes = onDocumentWritten("working_hours/{professionalUid}", async () => {

  const firestore = admin.firestore();

  const barbersRef = await firestore.collection("barbers").listDocuments()
  const barbersDocumentsRef = await firestore.getAll(...barbersRef)
  const workingHoursRef = firestore.collection("working_hours").doc("default")

  const barbersUid = barbersDocumentsRef.map(doc => doc.data().uid)

  functions.logger.log(barbersUid)

  const allTimesRegistered = []
  const weekday = ["sunday", "weekday", "saturday"]

  for (const barberUid of barbersUid) {

    const workingHoursRef = firestore.collection("working_hours").doc(barberUid)
    const workingHoursData = (await workingHoursRef.get()).data()

    const allTimesFromCurrentBarber = []

    for (const day of weekday) {
      for (const time of workingHoursData[day]) {
        if (!allTimesFromCurrentBarber.includes(time)) allTimesFromCurrentBarber.push(time)
      }
    }

    for (const time of allTimesFromCurrentBarber) {
      if (!allTimesRegistered.includes(time)) allTimesRegistered.push(time)

    }
  }

  await workingHoursRef.set({
    times: allTimesRegistered
  })
})
