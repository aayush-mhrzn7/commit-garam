import { useRef, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { ClipboardType } from "lucide-react";
import Loader from "./components/ui/Loader";
import NEpali from "./assets/Nepali.png";

const App = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [generatedPromt, setGeneratedPrompt] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const mutation = useMutation<AxiosResponse, Error, void, unknown>({
    mutationFn: () =>
      axios.post("https://commit-garam.netlify.app/git/generate-commit/", {
        userMessage: userPrompt,
      }),
    onSuccess: (data) => {
      setGeneratedPrompt(data?.data?.commitMessages);
      console.log(data?.data?.commitMessages.split("\n\n"));
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className="bg-primary-foreground min-h-screen text-primary font-primary">
      <div className="mx-auto max-w-5xl pt-16 p-4 z-50 lg:p-20">
        <div className="">
          <h1 className="text-center  font-primaryBold font-bold text-5xl tracking-wide">
            Commit Garam!
          </h1>
          <div className="relative">
            <span className="  text-center my-2 font-semibold block">
              (a fun way to write git commits)
            </span>
            <img
              src={NEpali}
              alt=""
              className="absolute top-0 h-20 object-cover right-0
            "
            />
          </div>
        </div>
        <div className="border p-4 border-black/20 min-h-[700px] mt-6 rounded-lg">
          <div className="border border-black/20  rounded-md h-[600px] overflow-auto overflow-x-hidden p-3 mb-5">
            {generatedPromt ? (
              <span className="text-lg font-semibold capitalize">
                {" "}
                generated promts:
              </span>
            ) : null}
            {generatedPromt ? (
              generatedPromt
                .split("\n")
                .filter((item) => item)
                .map((item, index) => {
                  return item ? (
                    <span className="flex items-center my-3 gap-4 border-2 p-2">
                      <span className="text-lg font-semibold inline-block">
                        {index + 1}
                      </span>
                      <span className="flex justify-between   w-full  items-center text-lg text-start font-bold">
                        {item}
                        <span>
                          <ClipboardType
                            onClick={() => navigator.clipboard.writeText(item)}
                          />
                        </span>
                      </span>
                    </span>
                  ) : null;
                })
            ) : mutation.isPending ? (
              <Loader />
            ) : (
              <div className="text-center h-full flex justify-center items-center flex-col">
                <h3 className="text-2xl font-semibold font-primary text-center">
                  Need help with your commits?
                </h3>
                <span className="capitalize text-lg text-center my-2">
                  Let Commitly do the hard work for you. Generate fun and witty
                  commit messages.
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-4 max-sm:flex-col">
            <Input
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputRef.current) {
                  setGeneratedPrompt("");
                  mutation.mutate();
                }
              }}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="text-xl max-sm:text-sm p-5 border-slate-50/20 focus-visible:ring-0 border-tr-0 border-br-0 outline-none"
              placeholder="E.G. Pushed Commits into Production"
            />
            <Button
              onClick={() => {
                if (inputRef.current) {
                  setGeneratedPrompt("");
                  mutation.mutate();
                }
              }}
              className="font-primary font-semibold"
              variant="default"
              size="lg"
            >
              {/* Generate */}
              {mutation.isPending ? "Pending....." : "Generate"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
