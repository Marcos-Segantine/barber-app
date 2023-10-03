/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 */

const functions = require('firebase-functions');
const { setGlobalOptions } = require("firebase-functions/v2")
const admin = require('firebase-admin');
const { onSchedule } = require("firebase-functions/v2/scheduler");

admin.initializeApp();

// Set the maximum instances to 10 for all functions
setGlobalOptions({ maxInstances: 10 });

exports.canUseApp = functions.region("southamerica-east1").https.onRequest((request, response) => {
  const responseData = {
    response: true
  };
  response.json(responseData);
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

    const schedulesMonthData = (await schedulesMonthRef.get()).data()
    const unavailableTimesData = (await unavailableTimesRef.get()).data()
    const schedulesUidData = (await schedulesUidRef.get()).data().schedules

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

      for (const date in blockedTimesData) {
        const [year, month, day] = date.split("-")
        if (+day < currentDay) delete blockedTimesData[date]
      }

      for (const date in daysBlockedData) {
        const [year, month, day] = date.split("-")
        if (+day < currentDay) delete daysBlockedData[date]
      }

      batch.set(blockedTimesRef, { ...blockedTimesData })
      batch.set(daysBlockedRef, { ...daysBlockedData })
    }

    batch.set(schedulesMonthRef, schedulesMonthData)
    batch.set(unavailableTimesRef, unavailableTimesData)
    batch.set(schedulesUidRef, {
      schedules: schedulesUidData
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
