import http from "k6/http";

export const options = {
  stages: [
    { duration: "5s", target: 1000 },
    { duration: "60s", target: 10000 },
    { duration: "5s", target: 0 },
  ],
};

export default function () {
  http.get("http://my-app/heavy");
}
