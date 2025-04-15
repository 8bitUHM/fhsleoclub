import { db } from "./config";
import { ref, child, DatabaseReference } from "firebase/database";

const eventRefs = ref(db, 'events');
const clubMembersRefs = ref(db, 'club-members');
const usersRef = ref(db, 'users');
const authorizedMembersRef = ref(db, 'authorized-members');

export function getChildRef(ref:DatabaseReference, path:string):DatabaseReference {
  return child(ref, path);
}

export { eventRefs, clubMembersRefs, usersRef, authorizedMembersRef };

