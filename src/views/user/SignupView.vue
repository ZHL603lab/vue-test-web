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
  username: z.string().min(2).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(20),
  confirmPassword: z.string().min(8).max(20),
}).refine(data => data.password == data.confirmPassword, {
  message: "两次密码输入不一致！",
  path: ["confirmPassword"]
}))

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
}, {
  name: "confirmPassword",
  label: "确认密码",
  type: "password",
  placeholder: "......",
  description: "请重新输入以确认您的密码",
}, {
  name: "email",
  label: "邮箱",
  type: "email",
  placeholder: "xxxxxxxx@xxx.xxx",
  description: "这是你账户登录的邮箱。",
}, {
  name: "nickname",
  label: "昵称",
  type: "text",
  placeholder: "CC Violett",
  description: "这是你账户和对外公开显示的昵称",
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
          注册新用户
        </CardTitle>
        <CardDescription>
          欢迎你的到来！
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

          <div class="flex justify-center">
            <Button type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </CardContent>
      <CardFooter>
        <div class="font-light text-sm">
          说明：我们不会收集您任何信息
        </div>
      </CardFooter>
    </Card>
  </div>
</template>

<style scoped>

</style>