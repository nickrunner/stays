import { NextPage } from "next";

import Add from "../../../../src/components/Portals/Hosts/Stays/Add";
import StaysPage from "../../../../src/StaysPage";

const AddStayPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <Add />
    </StaysPage>
  );
};

export default AddStayPage;
