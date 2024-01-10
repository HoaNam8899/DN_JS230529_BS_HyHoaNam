import connectDB from "../db";
import ITask from "../interfaces";
connectDB.connect((error) => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

class TaskService {
    async getAll(): Promise<ITask[]> {
        const query: string = "SELECT * FROM tasks_table";
        const data: any = await new Promise((resolve, rejects) => {
            connectDB.query(query, (err, data) => {
                if (err) console.log("error", err);
                resolve(data);
            })
        })
        return data
    };
    async getById(id: string): Promise<ITask[]> {
        let getId = +id;
        const query: string = `SELECT * FROM tasks_table WHERE id = ${getId}`;
        const data: any = await new Promise((resolve, rejects) => {
            connectDB.query(query, (err, data) => {
                if (err) console.log("error", err);
                resolve(data);
            })
        })
        return data;
    };
    async create(data: ITask) {
        const returnData: any = await new Promise((resolve, rejects) => {
            connectDB.query(`INSERT INTO tasks_table (content) VALUES (?)`, [data.content], (err, result) => {
                if (err) rejects(err);
                resolve(result);
            })

        })
        const newData = await this.getAll();
        return newData;
    };

    async update(id: string, data: ITask) {
        let getId = +id;
        new Promise((resolve, rejects) => {
            connectDB.query(`UPDATE tasks_table SET content = ? WHERE id = ?`, [data.content, getId], (err, result) => {
                if (err) rejects(err);
                resolve(result);
            })
        })
        const newData = await this.getAll();
        return newData;
    };
    async delete(id: string) {
        let getId = +id;
        new Promise((resolve, rejects) => {
            connectDB.query(`DELETE FROM tasks_table WHERE id = ?`, [getId], (err, result) => {
                if (err) rejects(err);
                resolve(result);
            })
        })
        const newData = await this.getAll();
        return newData;
    }

}

export default TaskService;