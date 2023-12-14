<script>
    import { Section, Register } from 'flowbite-svelte-blocks';
    import { Button, Checkbox, Label, Input } from 'flowbite-svelte';
    import { DarkMode } from 'flowbite-svelte';
</script>
    
<Section name="register">
    <Register href="/signin">
    <svelte:fragment slot="top">
        <!--<img class="w-8 h-8 mr-2" src="/images/logo.svg" alt="logo" />-->
    </svelte:fragment>
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <form class="flex flex-col space-y-6" method="POST">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Sign Up</h3>
        <Label class="space-y-2">
            <span>Name</span>
            <Input type="text" name="name" placeholder="Carl" required />
        </Label>
        <Label class="space-y-2">
            <span>Surname</span>
            <Input type="text" name="surname" placeholder="Nxumalo" required />
        </Label>
        <Label class="space-y-2">
            <span>Student Number</span>
            <Input type="number" name="student_number" placeholder="00000000" required />
        </Label>
        <Label class="space-y-2">
            <span>Email</span>
            <Input type="email" name="email" placeholder="studentNo@mynwu.ac.za" required />
        </Label>
        <Label class="space-y-2">
            <span>Password</span>
            <Input type="password" name="password" placeholder="••••••••••" required />
        </Label>
        <div class="flex items-start">
            <Checkbox name="type">Are you a lecturer?</Checkbox>
        </div>
        <Button type="submit" class="w-full1">Create an account</Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already have an account? <a href="/signin" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in here</a>
        </div>
        </form>
    </div>
    </Register>
</Section>