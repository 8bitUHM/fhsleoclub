import { db } from "./config";
import { ref } from "firebase/database";

const eventRefs = ref(db, "events");
const clubMembersRefs = ref(db, "club-members");

export { eventRefs, clubMembersRefs };
