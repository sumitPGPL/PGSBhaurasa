import React from 'react'
import NoticeParent from '@/components/Notice/NoticeParent'
import {
  getSchoolDetails,
  getSchools,
} from "@/lib/services/schools/schoolservices";
import { loadProfile } from "@/lib/services/user/userServices";
import injectToken from "@/app/actions";
import { getAllNotice } from "@/lib/services/notices/index";
import { myUuid } from '@/lib/constants/school';
export default async function page() {
  const isFailed = await injectToken();
  const profie = await loadProfile();
  const clientProps = {};
  clientProps.isFailed = isFailed;
  let school = await getSchoolDetails();
  let schoolUuid = myUuid
  if (!isFailed) {
    let schools = [];
    if (profie?.userType === "ADMIN") {
      schoolUuid = "";
      schools = await getSchools();
      clientProps.schools = schools.map(({ uuid, city }) => ({
        value: uuid,
        label: city,
      }));
    }
    clientProps.noticeList = await getAllNotice(myUuid);
    clientProps.isFailed = false;
    clientProps.profie = profie;
    clientProps.schoolUuid = schoolUuid;
  }
  return (
    <div><NoticeParent clientProps={clientProps}/></div>
  )
}
