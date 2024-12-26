/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { EMOTE_KIT_WIDGETS } from "@embed-stuff/utils/constants";

import { BannerWidget } from "~/app/widget/Banner/index.wc";
import { FeedbackWidget } from "~/app/widget/Feedback/index.wc";

customElements.define(EMOTE_KIT_WIDGETS.feedback, FeedbackWidget);
customElements.define(EMOTE_KIT_WIDGETS.banner, BannerWidget);
