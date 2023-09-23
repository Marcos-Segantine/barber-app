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
const { logger } = require("firebase-functions");

admin.initializeApp();

// Set the maximum instances to 10 for all functions
setGlobalOptions({ maxInstances: 10 });

exports.canUseApp = functions.region("southamerica-east1").https.onRequest((request, response) => {
  const responseData = {
    response: true
  };
  response.json(responseData);
});

exports.clearDatabase = onSchedule("every day 00:00", async (event) => {
  const date = new Date();
  const currentDate = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  const batch = admin.firestore().batch()

  const docsName = `${currentMonth}_${currentYear}`;

  const removePastDays = async () => {

    const filterSchedulesUid = async () => {
      const dataTemp = (await schedulesUidRef.get()).data();
      const schedules = dataTemp.schedules;

      return schedules.filter(schedule => {
        +schedule.split("-")[3] >= +currentDate;
      })
    }

    const schedulesMonthRef = admin.firestore().collection("schedules_month").doc(docsName);
    const unavailableTimesRef = admin.firestore().collection("unavailable_times").doc(docsName);
    const schedulesUidRef = admin.firestore().collection("schedules_uid").doc(docsName);

    const schedulesMonthData = (await schedulesMonthRef.get()).data();
    const unavailableTimesData = (await unavailableTimesRef.get()).data();
    const schedulesUidData = filterSchedulesUid()

    const daysInCurrentMonth = Object.keys(schedulesMonthData);

    for (const day of daysInCurrentMonth) {
      if (+day < +currentDate) {
        delete schedulesMonthData[day]
        delete unavailableTimesData[day]
      }
    }

    batch.set(schedulesMonthRef, schedulesMonthData);
    batch.set(unavailableTimesRef, unavailableTimesData);
    batch.set(schedulesUidRef, schedulesUidData);
  }

  const removePastMonths = async () => {

    if (+currentMonth === 1) {
      const docName = `12_${+currentYear - 1}`;

      const schedulesMonthRef = admin.firestore().collection("schedules_month").doc(docName);
      const unavailableTimesRef = admin.firestore().collection("unavailable_times").doc(docName);
      const schedulesUidRef = admin.firestore().collection("schedules_uid").doc(docsName);

      batch.delete(schedulesMonthRef)
      batch.delete(unavailableTimesRef)
      batch.delete(schedulesUidRef)
    }
    else {
      const docName = currentMonth < 10 ? `0${+currentMonth - 1}_${currentYear}` : `${+currentMonth - 1}_${currentYear}`

      const schedulesMonthRef = admin.firestore().collection("schedules_month").doc(docName);
      const unavailableTimesRef = admin.firestore().collection("unavailable_times").doc(docName);
      const schedulesUidRef = admin.firestore().collection("schedules_uid").doc(docName);

      batch.delete(schedulesMonthRef)
      batch.delete(unavailableTimesRef)
      batch.delete(schedulesUidRef)
    }
  }

  if (+currentDate === 1) {
    await removePastMonths();
    await removePastDays();
  }
  else {
    await removePastDays();
  }

  await batch.commit();

  logger.log("Database cleanup finished");
});
