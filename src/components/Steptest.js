import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Steptest() {
  // ⭐ Dynamic steps
  const steps = [
    { key: "step1", title: "Which degree are you interested in?", options: ["option1", "option2" , "option3", "option4", "option5", "option6", "option7", "option8", "option9", "option10"] },
    { key: "step2", title: "Which course would you like to pursue?", options: ["option1", "option2", "option3", "option4"] },
    { key: "step3", title: "Which specialization would you like to pursue?", options: ["option1"] },
    { key: "step4", title: "What is your Budget?", options: ["option1", "option2", "option3"] },
    { key: "step5", title: "What is your preferred study mode?", options: ["option1", "option2", "option3", "option4", "option5"] },
  ];

  const dynamicSchemaShape = {};
  steps.forEach((step) => {
    dynamicSchemaShape[step.key] = yup.string().required();
  });

  dynamicSchemaShape.name = yup.string().required();
  dynamicSchemaShape.email = yup.string().email().required();
  dynamicSchemaShape.message = yup.string().required();

  const schema = yup.object().shape(dynamicSchemaShape);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [stepIndex, setStepIndex] = useState(0);

  const onSubmit = (data) => {
    // console.log(data);
  };

  const StepRadio = ({ title, name, options }) => (
    <Card className="p-6 border-0 shadow-none">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <RadioGroup
  value={watch(name)}
  onValueChange={(val) => {
    setValue(name, val);
    setTimeout(() => {
      setStepIndex((prev) =>
        prev + 1 < steps.length + 1 ? prev + 1 : prev
      );
    }, 200);  // for auto next step
  }}
  
  className="space-y-4"
>
  {options?.map((opt, index) => {
    const isSelected = watch(name) === opt;

    return (
      <Label
        key={index}
        htmlFor={`${name}-${index}`}
        className="block cursor-pointer"
      >
        <div
          className={`
            p-4 rounded-2xl shadow-sm transition bg-white
            border 
            ${isSelected ? "border-black shadow-md" : "border-gray-300"}
          `}
        >
          <div className="text-base font-medium">Option {index + 1}</div>

          <RadioGroupItem
            value={opt}
            id={`${name}-${index}`}
            className="sr-only"
          />
        </div>
      </Label>
    );
  })}
</RadioGroup>


        {errors[name] && (
          <p className="text-red-500 text-sm mt-1">This field is required</p>
        )}
      </CardContent>
    </Card>
  );

  const currentStep = steps[stepIndex];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto p-6 space-y-6">
      <div className="text-center text-2xl font-bold">
        Step {stepIndex + 1} of {steps.length + 1}
      </div>

      {/* ⭐ Dynamic rendering */}
      {stepIndex < steps.length ? (
        <StepRadio title={currentStep.title} name={currentStep.key} options={currentStep.options} />
      ) : (
        <Card className="p-6 rounded-2xl shadow-md">
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold">Query Form</h2>

            <Input placeholder="Your Name" {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

            <Input placeholder="Your Email" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">Enter valid email</p>}

            <Textarea placeholder="Your Message" {...register("message")} />
            {errors.message && (
              <p className="text-red-500 text-sm">Message is required</p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStepIndex(stepIndex - 1)}
          disabled={stepIndex === 0}
        >
          Back
        </Button>

        {stepIndex < steps.length ? (
          <Button type="button" onClick={() => {
            const field = `step${stepIndex + 1}`;
            // if (!watch(field)) {
            //   return alert("Please select an option before continuing");
            // }
            setStepIndex(stepIndex + 1);
          }}>
            Next
          </Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </div>
    </form>
  );
}
