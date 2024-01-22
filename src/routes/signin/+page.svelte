<script>
    import { Section, Register } from 'flowbite-svelte-blocks';
    import { Button, Checkbox, Label, Input } from 'flowbite-svelte';
</script>
    
<Section  name="crudreadsection">
    <Register href="/signin">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <form class="flex flex-col space-y-6" method="POST">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Sign in</h3>
        <Label class="space-y-2">
            <span>Email</span>
            <Input type="email" name="email" placeholder="studentNo@mynwu.ac.za" required />
        </Label>
        <Label class="space-y-2">
            <span>Password</span>
            <Input type="password" name="password" placeholder="••••••••••" required />
        </Label>
        <Button type="submit" class="w-full1">Sign in</Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Do not have an account? <a href="/signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up here</a>
        </div>
        </form>
    </div>
    </Register>
</Section>