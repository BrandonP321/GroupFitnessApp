import { ScreenUtils } from "../../utils/ScreenUtils";

export { colors } from "./colors.style";

const { vw } = ScreenUtils

export const baseUi = {
    contentWidth: vw - 60,
    contentGutter: 30,
} as const
