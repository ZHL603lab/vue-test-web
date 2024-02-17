<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { vAutoAnimate } from '@formkit/auto-animate/vue'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const formSchema = toTypedSchema(z.object({
  username: z.string(),
  password: z.string(),
}));

type InputFormType = {
  name: string,
  label: string,
  type: string,
  placeholder: string,
  description: string,
};

const inputFormItems : InputFormType[] = [{
  name: "username",
  label: "用户名",
  type: "text",
  placeholder: "ccviolett",
  description: "这是你账户登录的用户名。"
}, {
  name: "password",
  label: "密码",
  type: "password",
  placeholder: "......",
  description: "这是你账户登录的密码。",
}];

function onSubmit(values) {
  console.log(values);
}
</script>

<template>
  <div class="p-4 flex justify-center">
    <Card class="w-1/2">
      <CardHeader>
        <CardTitle>
          登录
        </CardTitle>
        <CardDescription>
          欢迎回来！
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form
            :validation-schema="formSchema"
            @submit="onSubmit"
            class="space-y-6 ">

          <div
              v-for="item in inputFormItems"
              :key="item.name">
            <FormField
                v-slot="{ componentField }"
                :name="item.name">
              <FormItem v-auto-animate>
                <FormLabel>
                  {{ item.label }}
                </FormLabel>
                <FormControl>
                  <Input
                      v-bind="componentField"
                      :type="item.type"
                      :placeholder="item.placeholder"/>
                </FormControl>
                <FormDescription>
                  {{ item.description }}
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex justify-center space-x-2">
            <Button type="submit">
              登录
            </Button>
            <RouterLink to="/user/forget/password">
              <Button type="button" variant="secondary">
                忘记密码
              </Button>
            </RouterLink>
            <RouterLink to="/user/forget/username">
              <Button type="button" variant="secondary">
                忘记用户名
              </Button>
            </RouterLink>
          </div>
        </Form>
      </CardContent>
      <CardFooter>
        <div class="font-light text-sm">
          说明：请勿反复提交尝试
        </div>
      </CardFooter>
    </Card>
  </div>
</template>

<style scoped>

</style>
