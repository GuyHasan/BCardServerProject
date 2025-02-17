import cors from "cors";

const corsOptions = cors({
	origin: ["http://localhost:5173", "http://127.0.0.1:5500"],
});

export default corsOptions;
