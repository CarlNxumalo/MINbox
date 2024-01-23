import pkg from 'pg';
import {con} from '$env/static/private'
const { Pool } = pkg;
const connectionString = con
 
export const pool = new Pool({
  connectionString,
})

export async function crud(query){
  let client = await pool.connect()
  try {
      const result = await client.query(query)
      return result;
  } catch (error) {
      console.log("Crud()"+error.message)
      throw new Error("Error with database query.\n"+error.message)
  } finally{
      client.release()
  }
}

/*
 const { data, error } = await locals.supabase.auth.updateUser({
        data: { hello: 'world' }
    })
    
const query = {
  text: `
  select array_agg(id)
  from "Modules"
  where id>1;
  select auth.users.id, email, module_code
from auth.users
inner join public."Modules" on "Modules".lecturer_id = auth.users.id
where public."Modules".id = 1;
  `,
  rowMode: 'array'
}
console.log((await crud(query)))
*/