import { useContext } from "react";
import { ClubEvent } from "../lib/types";
import { child, remove } from "firebase/database";
import { clubMembersRefs } from "../lib/dbRefs";
import AuthContext from "../contexts/AuthContext";

interface EventDataProps {
    event: ClubEvent;
    setSelectedEvent: (event: ClubEvent) => void;
    selectedMember: ClubEvent | null;
}
