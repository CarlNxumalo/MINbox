import { supabase } from '$lib/supabaseClient.js';
import { signUp } from '$lib/user.js';

export function load({ cookies }) {
	
	return {
		todos: []
	};
}

export const actions = {
	default: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get('name');
        const surname = formData.get('surname');
        const email = formData.get('email');
        const password = formData.get('password');
        const type = (formData.get('type')=='on') ? true:false;
        const student_number = formData.get('student_number');
        console.log(type);
        //create user
        signUp(name, surname, student_number, email, password, type)
        
	}
};
