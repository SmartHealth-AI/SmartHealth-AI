import { useMemo, useState } from "react";
import { useRouter } from "next/router";

import isEmpty from "lodash/isEmpty";

import { useForm } from "@/components/FormBuilder";


import { useMutation } from "@/libs/ReactQuery";


import { validateEmail, validateOnlyNumber, validatePhone } from "@/utils/validate";
import { useAuth } from "@/libs/Auth";
import { urlParams } from "@/utils/urlParams";
import { checkAvailability } from "@/services/UserService";
import { FormBuilder } from "@/components/FormBuilder/FormBuilder";


const SignIn = ({ query }: any) => {
  const router = useRouter();

  const { login, isLoggingIn } = useAuth();
  const form = useForm({
    initialValues: { email: urlParams("email") },
    validate: {
      email: (value: any) => {
        if (isEmpty(value)) {
          return "Vui lòng nhập email hoặc số điện thoại";
        }

        if (validateOnlyNumber(value)) {
          if (!validatePhone(value)) {
            return "Sai định dạng phone";
          }
        } else {
          if (!validateEmail(value)) {
            return "Sai định dạng email";
          }
        }
        return null;
      },
    },
  });
  

  const [isUserExist, setUserExist] = useState(false);

  const { mutate, isLoading } = useMutation(checkAvailability, {
    onSuccess: (data) => {
      if (!data?.data?.data?.available) {
        setUserExist(true);
      } else {
        // api
        router.push(``); 
      }
    },
  });

  const isUrl = (url: string) => {
    return url.includes("http") || url.includes("https");
  };

  const isArobidUrl = (url: string) => {
    const hostRegex = /(?:https?:\/\/)?(?:[^@\n]+@)?([^:/\n?]+)/g;
    const rootDomains = ["arobid.com", "arobidbeta.online", "localhost"];

    return rootDomains.some((rootDomain) => {
      const host = url.match(hostRegex)?.[0];
      return host?.includes(rootDomain);
    });
  };

  const onSubmit = async (value: any) => {
    if (isLoggingIn) return;

    return login(value).then(() => {
    
      const redirectUrl = router.query?.redirect_url as string;
      const latestPath = redirectUrl || localStorage.getItem(`path-${value?.email}`);
      if (latestPath) {
        // Open new tab if redirect to external url
        if (isUrl(latestPath) && isArobidUrl(latestPath)) {
          // open new tab
          window.open(latestPath, "_blank");
          router.push("/");
          return;
        }

        // Prevent redirect to external url
        if (!isArobidUrl(latestPath)) {
          router.push("/");
          return;
        }

        // Redirect to latest path
        router.push(latestPath);
      } else {
        router.push("/");
      }
    });
  };

  const fields = useMemo(
    () => [
      {
        type: "textPhone",
        name: "email",
        labelAlign: "left",
        label: "Email hoặc số điện thoại",
        component: {
          placeholder: "Nhập email hoặc số điện thoại",
        },
      },
      ...(isUserExist
        ? [
            {
              type: "password",
              name: "password",
              labelAlign: "left",
              label: (
                <span className="flex justify-between">
                  <span>Mật khẩu</span>
                  <span
                    onClick={() => router.push("/authentication/forget-password")}
                    className=" cursor-pointer text-sm text-persian-700 font-normal font-main"
                  >
                    Quên mật khẩu?
                  </span>
                </span>
              ),
              component: {
                placeholder: "Nhập mật khẩu",
              },
            },
          ]
        : []),
    ],
    [isUserExist],
  );

  const handleSignIn = (value: any) => {
    const isPhone = validateOnlyNumber(value.email);
    if (isUserExist) {
      onSubmit(value);
    } else {
      mutate({
        params: {
          [isPhone ? "phone" : "email"]: value.email,
        },
      });
    }
  };

  return (
        <FormBuilder
          gutter={24}
          withCardComponent={false}
          form={form}
          fields={fields}
          submitLoading={isLoggingIn || isLoading}
          submitText="Tiếp tục"
          submitClassName="uppercase font-bold text-base"
          onSubmit={(value: any) => handleSignIn(value)}
        />
    
  );
};

SignIn.getInitialProps = ({ query }: any) => {
  return { query };
};

export default SignIn;
