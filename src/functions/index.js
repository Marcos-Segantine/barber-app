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

exports.clearDatabase = onSchedule("every day 04:00", async () => {
  const date = new Date();
  const currentYear = +date.getFullYear();
  const currentMonth = +date.getMonth() + 1;
  const currentDay = +date.getDate();

  const batch = admin.firestore().batch();

  const removePastDays = async () => {
    const schedulesMonthRef = admin.firestore().collection('schedules_month').doc(`${currentMonth}_${currentYear}`);
    const unavailableTimesRef = admin.firestore().collection('unavailable_times').doc(`${currentMonth}_${currentYear}`);
    const schedulesUidRef = admin.firestore().collection('schedules_uid').doc(`${currentMonth}_${currentYear}`);

    const schedulesMonthData = (await schedulesMonthRef.get()).data();
    const unavailableTimesData = (await unavailableTimesRef.get()).data();
    const schedulesUidData = (await schedulesUidRef.get()).data();

    if (schedulesMonthData) {
      const days = Object.keys(schedulesMonthData);

      for (const day of days) {
        if (+day < +currentDay) {
          delete schedulesMonthData[day];
        }
      }
    }

    if (unavailableTimesData) {
      const days = Object.keys(unavailableTimesData)

      for (const day of days) {
        if (+day < +currentDay) {
          delete unavailableTimesData[day];
        }
      }
    }

    if (schedulesUidData) {
      const elementsToRemove = [];

      for (const scheduleUid of schedulesUidData.schedules) {
        const [year, month, day] = scheduleUid.split("-").splice(1, 3)

        if (+day < currentDay) {
          elementsToRemove.push(scheduleUid);
        }
      }

      schedulesUidData.schedules = schedulesUidData.schedules.filter(
        (item, index) => !elementsToRemove.includes(item)
      )
    }

    batch.set(schedulesMonthRef, schedulesMonthData);
    batch.set(unavailableTimesRef, unavailableTimesData);
    batch.set(schedulesUidRef, schedulesUidData);
  }

  const removePastMonths = async () => {
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const lastYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    const schedulesMonthRef = admin.firestore().collection('schedules_month').doc(`${lastMonth}_${lastYear}`);
    const unavailableTimesRef = admin.firestore().collection('unavailable_times').doc(`${lastMonth}_${lastYear}`);
    const schedulesUidRef = admin.firestore().collection('schedules_uid').doc(`${lastMonth}_${lastYear}`);

    const schedulesMonthData = (await schedulesMonthRef.get()).data();
    const unavailableTimesData = (await unavailableTimesRef.get()).data();
    const schedulesUidData = (await schedulesUidRef.get()).data();


    if (schedulesMonthData) batch.delete(schedulesMonthRef);
    if (unavailableTimesData) batch.delete(unavailableTimesRef);
    if (schedulesUidData) batch.delete(schedulesUidRef);
  }

  await removePastDays();
  if (currentDay === 1) await removePastMonths();

  await batch.commit();
});