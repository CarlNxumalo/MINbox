import {crud} from '$lib/DB.js';

export class Lecturer {
    //will get parameters from supabase user session meta data
    constructor(id, name, surname, email, student_number) {
      this.id = id
      this.name = name
      this.surname = surname
      this.email = email
      this.student_number = student_number
    }

    static userObject(session){
        const name = session.user.user_metadata.name
        const surname = session.user.user_metadata.surname
        const uni_number  = session.user.user_metadata.uni_number
        const id = session.user.id
        const email = session.user.email
        return new Lecturer(id, name, surname, email, uni_number);
    }
    static createObject(result) {
        const name = result.rows[0].raw_user_meta_data.name
        const surname = result.rows[0].raw_user_meta_data.surname
        const uni_number  = result.rows[0].raw_user_meta_data.uni_number
        const id = result.rows[0].id
        const email = result.rows[0].email
        return new Lecturer(id, name, surname, email, uni_number);
    }
    async myModules(){
        //return the modules they have joined 
        const query = {
            text: `
            select id as value, module_code as name
            from "Modules"
            where lecturer_id = $1;
            `,
            values: [this.id]
        }
        let result = await crud(query)
        return result.rows
    }
    async addModule(module_code){
        const query = {
            text: `
            insert into
                "Modules" (lecturer_id, module_code)
            values
                ($1, $2);
            `,
            values: [this.id, module_code]
        }
        await crud(query);
    }
    async removeModule(module_id){
        const query = {
            text: `
            delete 
            from "Modules"
            where id = $1;
            `,
            values: [module_id]
        }
        await crud(query);
    }
    async updateModule(module_id, module_code){
        const query = {
            text: `
            update "Modules"
            set
                module_code = $2
            where
                id = $1;
            `,
            values: [module_id, module_code]
        }
        await crud(query);
    }
    async reply(message_id, reply){
        const query = {
            text: `
            update "Messages"
            set
                reply = $2
            where
                id = $1;
            `,
            values: [message_id, reply]
        }
        await crud(query);
    }
    async seeMessages(){
        const query = {
            text: `
            select m.id, mod.module_code, m.subject, m.message, m.reply, m.student_id, m.private
                from "Messages" m
            inner join "Modules" mod on m.module_id = mod.id
                where mod.lecturer_id = $1
            `,
            //and m.reply isnull;
            values: [this.id]
        }
        let result = await crud(query)
        return result.rows       
    }
    async seeMessage(message_id){
        const query = {
            text: `
            select m.id, mod.module_code, m.subject, m.message, m.reply, u.raw_user_meta_data as student, m.private
                from "Messages" m
            inner join "Modules" mod on m.module_id = mod.id
            inner join auth.users u on m.student_id = u.id
                where mod.lecturer_id = $1
                and m.id = $2;
            `,
            //and m.reply isnull
            values: [this.id, message_id]
        }
        let result = await crud(query)
        return result.rows[0]       
    }
}
/*
const query = {
    text: `
      select raw_user_meta_data, id, email
      from auth.users
      where id=$1;
    `,
    values: ['d77fbab4-710f-49c6-a2bb-3fea012411ff'],
}
  
try {
    const carl = Lecturer.createObject(await crud(query));
    console.log(await carl.myModules())
    console.log(await carl.seeMessages())
    //await carl.reply(1, "You will recieve them on the 25th of march")
    //console.log(await carl.seeMessages())


} catch (error) {
    console.log(error)
}
*/


