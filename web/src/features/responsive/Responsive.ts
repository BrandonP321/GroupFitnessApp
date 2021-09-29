import React, { useEffect } from "react";
import { useAppDispatch } from "../../features/hooks";
import { screenResized } from "../../features/responsive/responsiveSlice";

export function Responsive() {
    const dispatch = useAppDispatch();

    const _massiveWidth = 2500;
    const _extraLargeWidth = 1600;
    const _largeWidth = 1300;
    const _mediumWidth = 1000;
    const _mobileWidth = 870;
    const _tinyWidth = 450;

    const testMassive = (vw: number) => vw >= _massiveWidth;
    const testExtraLarge = (vw: number) => vw <= _extraLargeWidth;
    const testLarge = (vw: number) => vw <= _largeWidth;
    const testMedium = (vw: number) => vw <= _mediumWidth;
    const testMobile = (vw: number) => vw <= _mobileWidth;
    const testTiny = (vw: number) => vw <= _tinyWidth;

    useEffect(() => {
        // make initial screen size check on page load
        handleScreenResize();
        
        window.addEventListener("resize", handleScreenResize)

        return () => window.removeEventListener("resize", handleScreenResize)
    }, [])

    /* updates redux state on resize */
    const handleScreenResize = () => {
        const vw = window.innerWidth;

        const newState = {
            massive: testMassive(vw),
            extraLarge: testExtraLarge(vw),
            large: testLarge(vw),
            medium: testMedium(vw),
            mobile: testMobile(vw),
            tiny: testTiny(vw)
        }

        dispatch(screenResized(newState));
    }

    return null;
}