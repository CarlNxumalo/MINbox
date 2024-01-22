export const actions = {
    default: async ({ request, locals: {supabase} }) =>{
        const formData = await request.formData();
        const name = formData.get('name');
        const surname = formData.get('surname');
        const email = formData.get('email');
        const password = formData.get('password');
        const type = (formData.get('type')=='on') ? true:false;
        const student_number = formData.get('student_number');

        //input validation here

        const { data, error } = await supabase.auth.signUpWithPassword({
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

        return{
            success: "Signup was succesfull."
        }
    }
};
