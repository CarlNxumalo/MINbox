import { redirect } from '@sveltejs/kit'
import { Student } from '../../../lib/Student.js'
import { Lecturer } from '../../../lib/Lecturer.js'

export async function load({ locals:{user}, params, cookies }) {
    //show joinned modules
    try {
        const User = await user()
        if(User instanceof Student){
            //console.log(await User.myModules())
            return{
                modules: await User.myModules()
            }
        }
    } catch (error) {
        return{
            modules: []
        }
    }
    if(User instanceof Lecturer){
        throw redirect (308, '/lecturer')
    }
}

export const actions = {
	leave: async ({ request, locals:{user} }) => {
		try {
            const data = await request.formData();
            const module_id = parseInt(data.get('id'), 10);
            const User = await user();
            if(User instanceof Student ){
                await User.leaveModule(module_id)
            }
            return{
                message: "Successfully removed the module!"
            }

        } catch (error) {
            return{
                message: "Failed to remove the module: "+error.message
            }
        }
	}
}