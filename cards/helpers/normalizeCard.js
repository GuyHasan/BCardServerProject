import { generateBizNum } from "./generateBizNum.js";

const normalizeCard = async (card, userId, oldCard = {}) => {
	return {
		...card,
		image: {
			url: card.image?.url || "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
			alt: card.image?.alt || "Business Card Image",
		},
		bizNumber: oldCard.bizNumber || (await generateBizNum()),
		user_id: oldCard.user_id || userId,
	};
};

export { normalizeCard };
