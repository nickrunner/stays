// src/server.ts
import { app } from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Stays Platform listening at http://localhost:${port}`)
);