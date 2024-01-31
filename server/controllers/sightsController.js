import { log } from 'console';
import fs from 'fs';
import { list } from 'postcss';

export const getSights = (req, res) => {
    const data = fs.readFileSync("./db/data.json", "utf8", (err, data) => {

        if (err) {
            console.error(err);
        }

        return data;
    });

    res.send(JSON.parse(data));

}

export const getSight = (req, res) => {

    const sight = req.params.sight;

    const data = fs.readFileSync("./db/data.json", "utf8", (err, data) => {

        if (err) {
            console.error(err);
        }

        return data;
    });

    const list = JSON.parse(data);
    const index = list.findIndex((elm) => elm.name.toLowerCase().replaceAll(" ", "-").trim() == sight);

    if (index == -1) {
        res.send("error in sight!");
    } else {
        res.send(list[index]);
    }
}
