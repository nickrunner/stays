import { NextPage } from "next";

import Edit from "../../../../src/components/Portals/Hosts/Stays/Edit";
import StaysPage from "../../../../src/StaysPage";

const EditStayPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <Edit />
    </StaysPage>
  );
};

export default EditStayPage;
