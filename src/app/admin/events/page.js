import React from 'react'
import EventParentForm from '@/components/Event/EventParentForm'
import {
  getSchoolDetails,
  getSchools,
} from "@/lib/services/schools/schoolservices";
import { loadProfile } from "@/lib/services/user/userServices";
import injectToken from "@/app/actions";
import { getEvent } from '@/lib/services/events/eventSevices';

export default async function page() {
  const isFailed = await injectToken();
  const profie = await loadProfile();
  const clientProps = {};
  clientProps.isFailed = isFailed;
  let school = await getSchoolDetails();
  let schoolUuid = school.uuid
  if (!isFailed) {
    let schools = [];
    if (profie?.userType === "ADMIN") {
      schoolUuid = "";
      schools = await getSchools();
      console.log(schools)
      clientProps.schools = schools.map(({ uuid, city }) => ({
        value: uuid,
        label: city,
      }));
    }
    clientProps.events = await getEvent(schoolUuid);
    clientProps.isFailed = false;
    clientProps.profie = profie;
    clientProps.schoolUuid = schoolUuid;
  }

  return (
    <div><EventParentForm clientProps={clientProps}/></div>
  )
}
