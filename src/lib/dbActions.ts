import { db } from "./config";
import { ref, get } from "firebase/database";

const eventRef = ref(db, "events");
const clubMembersRef = ref(db, "club-members");
const authorizedMembersRef = ref(db, "authorized-members");


/** 
  * @returns all club events in the database or null if any not found
  * 
  */
async function getEvents() {
  try {
    const data = await get(eventRef);
    return data.val();
  } catch (e) {
    return e;
  }
}

export { eventRef, clubMembersRef, authorizedMembersRef };
export { getEvents };
