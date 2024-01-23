import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, locals }) =>{
        const formData = await request.formData();
        const name = formData.get('name');
        const surname = formData.get('surname');
        const email = formData.get('email');
        const password = formData.get('password');
        const type = (formData.get('type')=='on') ? true:false;
        const student_number = formData.get('student_number');

        //input validation here

        const { data, error } = await  locals.supabase.auth.signUp({
            email: email,
            password: password,
            options:{
                data: {
                    name:name,
                    surname:surname,
                    uni_number:student_number,
                    type:type
                }
            }
        });

        if(!error){
            throw redirect(303, "/signin")
        }

        return{
            message: "Signup was unsuccesfull. "+error.message
        }
        
        
    }
};
