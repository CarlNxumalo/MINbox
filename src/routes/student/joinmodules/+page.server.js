import { redirect } from '@sveltejs/kit'
import { Student } from '../../../lib/Student.js'
import { Lecturer } from '../../../lib/lecturer.js'

export async function load({ locals:{user}, params, cookies }) {
    //show joinned modules
    const User = await user()
    if(User instanceof Student){
        return{
            modules: await User.modulesNotJoined()
        }
    }
    if(User instanceof Lecturer){
        throw redirect (308, '/lecturer')
    }
}

export const actions = {
	join: async ({ cookies, request, locals:{user} }) => {
		try {
            const data = await request.formData();
            const module_id = parseInt(data.get('id'), 10);
            const User = await user();
            if(User instanceof Student ){
                await User.joinModule(module_id)
            }

        } catch (error) {
            return{
                message: "Failed to join the module: "+error.message
            }
        }
	}
}