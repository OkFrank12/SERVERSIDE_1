///CRUD
import http, { ServerResponse } from "http";

interface iDataEntry {
  id: number;
  course: string;
}

let dataEntry: iDataEntry[] = [
  { id: 1, course: "Backend" },
  { id: 2, course: "Frontend" },
];

interface iData {
  message: string;
  name: string;
  status: number;
  success: boolean;
  data: iDataEntry | iDataEntry[] | null;
}

let data: iData = {
  message: "Request Not Found",
  name: "Request Error",
  status: 404,
  success: false,
  data: null,
};

const port: number = 2121;

const server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(
  (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage>
  ) => {
    const { method, url } = req;

    let body: any = [];
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log(chunk);
      console.log(body);
    });

    req.on("data", () => {
      if (method === "GET" && url === "/") {
        data.message = "Reading from Database";
        data.name = "GET Request";
        data.status = 200;
        data.success = true;
        data.data = dataEntry;
      } else if (method === "POST" && url === "/") {
        dataEntry.push(JSON.parse(body));

        data.message = "Writing from Database";
        data.name = "POST Request";
        data.status = 201;
        data.success = true;
        data.data = dataEntry;
      } else if (method === "GET") {
        let id = req.url?.split("/")[1];
        console.log(id);

        data.message = "Reading Single Item from Database";
        data.name = "GET-ONE Request";
        data.status = 200;
        data.success = true;
        data.data = dataEntry[parseInt(id!) - 1];
      } else if (method === "DELETE") {
        let id = parseInt(req.url?.split("/")[1]!) - 1;
        let value = dataEntry.filter((el: any) => {
          el.id !== id;
        });
        JSON.stringify(data)
        data.message = `Deleting "${dataEntry[id].course}" from Database`;
        data.name = "DELETE-ONE Request";
        data.status = 201;
        data.success = true;
        data.data = value;
      } else {
      }
      res.writeHead(data.status, {
        "content-type": "application/json",
      });
      res.end(JSON.stringify(data));
    });
  }
);

server.listen(port, () => {
  console.log("Server is listening...");
});
