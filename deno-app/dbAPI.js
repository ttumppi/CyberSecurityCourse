import { Client } from "https://deno.land/x/postgres/mod.ts";

// Set up PostgreSQL client connection
const client = new Client({
  user: "user",
  database: "booking_system_db",
  hostname: "postgresql_db",
  password: "user",
  port: 5432,
});

await client.connect();

// const result = await client.queryObject("SELECT * FROM users")
// console.log(result.rows)

export const QueryDataBase = async (query, params) => {

    try{
        const result = await client.queryObject(query, params)
        return [true, result]
    }
    catch (error){
        console.log(error)
        return [false, null]
    }
    
}