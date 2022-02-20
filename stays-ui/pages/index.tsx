import React from "react";
import StaysPage from "../src/StaysPage";
import { globalContext } from "../src/GlobalStore";
import type { NextPage } from 'next';
import ComingSoon from "../src/components/ComingSoon/ComingSoon";


const ComingSoonPage: NextPage = () => {
    return (
        <div>
          <ComingSoon />
        </div>
    );
}

export default ComingSoonPage

