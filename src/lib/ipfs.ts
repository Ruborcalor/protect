import { create } from "ipfs-http-client";

// this is temp hard coding
const projectId = "2HBHiZ5a96Znilq9ctvqeAOolvP";
const projectSecret = "42e1ed93c2abc4e21528f99d9162dd6e";
const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

export const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});