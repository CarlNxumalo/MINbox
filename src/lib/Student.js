import {crud} from '$lib/DB.js';

export class Student {
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
        return new Student(id, name, surname, email, uni_number);
    }
    //when the session comes we must get the variables
    static createStudentObject(result) {
        const name = result.rows[0].raw_user_meta_data.name
        const surname = result.rows[0].raw_user_meta_data.surname
        const uni_number  = result.rows[0].raw_user_meta_data.uni_number
        const id = result.rows[0].id
        const email = result.rows[0].email
        return new Student(id, name, surname, email, uni_number);
    }

    async myModules(){
        //return the modules they have joined 
        const query = {
            text: `
            select
                m.id as value,
                m.module_code as name
            from
                "StudentModules" as s
                inner join "Modules" as m on s.module_id = m.id
            where
                s.student_id = $1;
            `,
            values: [this.id]
        }
        let records = await crud(query)
        return records.rows;

    }

    async joinModule(module_id){
        if(!Number.isInteger(module_id)){
            throw new Error('Module ID must be an integer');
        }
        const query = {
            text: `
            insert into
                "StudentModules" (student_id, module_id)
            values
                ($1, $2);
            `,
            values: [this.id, module_id]
        }
        const result = await crud(query)
    }

    async leaveModule(module_id){
        //make sure id is int.and if param is there/undifiend
        if(!Number.isInteger(module_id)){
            throw new Error("Module ID must be an integer");
        }
        const query = {
            text: `
                delete from public."StudentModules"
                where
                student_id = $1
                and module_id = $2;
            `,
            values: [this.id, module_id]
        }
        const result = await crud(query) 
    }

    async modulesNotJoined(){
        //return
        const query = {
            text: `
            SELECT
                m.id as value, m.module_code as name
            FROM
                "Modules" m
            LEFT JOIN
                "StudentModules" sm ON m.id = sm.module_id AND sm.student_id = '206017e9-48a5-4da1-b67d-b2536fb7e126'
            where  sm.module_id IS NULL;
            `
        }
        const res = await crud(query)
        return res.rows
    }

    async sendMessage(module_id, subject, message, Private){
        
            if(!Number.isInteger(module_id)){
                throw new Error("Module ID must be an integer");
            }
            if(!subject instanceof String){
                throw new Error("Subject must be a String");
            }
            if(!message instanceof String){
                throw new Error("Message must be a String");
            }
            if(!Private instanceof Boolean){
                throw new Error("Priavte must be true or false");
            }
            const query = {
                text: `
                insert into
                    "Messages" (
                        module_id,
                        student_id,
                        subject,
                        message,
                        private
                    )
                values
                    ($1, $2, $3, $4, $5);
    
                `,
                values: [module_id, this.id, subject, message, Private]
            }
            const result = await crud(query)
            console.log("sent message")  
        

        /*
        const mailOptions = {
            from: 'carlnxumalo@outlook.com',
            to: 'carl.ybongani@gmail.com',// Put lecturer email
            subject: subject,
            text: message,
        };

        try {
            // Send the email
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
            return true;
        } catch (error) {
            console.error('Error:', error);
        }
        */
    }

    async showMessages(){
        const query = {
            text: `
            select
                m.id, m.module_id, m.subject, m.message, m.reply, m.private, 
                mods.module_code, m.student_id
            from "Messages" m
                inner join "StudentModules" sm on m.module_id = sm.module_id
                inner join "Modules" mods on mods.id = m.module_id
            where 
                sm.student_id = $1;
            `,
            values: [this.id]
        }
        const result  = await crud(query)
        return result.rows
    }
    
}



/*
carl.myModules();
carl.modulesNotJoined();
*/  





