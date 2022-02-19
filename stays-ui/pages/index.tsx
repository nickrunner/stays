import React from "react";
import StaysPage from "../src/StaysPage";
import { globalContext } from "../src/GlobalStore";
import type { NextPage } from 'next';
import ComingSoon from "../src/components/ComingSoon/ComingSoon";


const ComingSoonPage: NextPage = () => {
    return (
        <StaysPage>
          <ComingSoon />
        </StaysPage>
    );
}

export default ComingSoonPage

