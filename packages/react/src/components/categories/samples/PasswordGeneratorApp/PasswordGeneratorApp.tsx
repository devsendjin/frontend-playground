import React, { useEffect, useRef } from "react";
import { useForm, SubmitHandler, UseFormGetValues, Controller } from "react-hook-form";
import cn from "classnames";
import styles from "./PasswordGeneratorApp.module.scss";

type FormValues = {
  includeSymbols: boolean;
  includeNumber: boolean;
  includeLowercaseChars: boolean;
  includeUppercaseChars: boolean;

  // userSymbols: string;
  excludeSymbols: string;

  // noSimilarCharacters: boolean,// noSequentialCharacters: boolean,
  autoGenerateOnTheFirstCall: boolean;
  // excludeSimilarCharacters: boolean,
  noDuplicateCharacters: boolean;
  // excludeAmbiguousCharacters: boolean,
  // autoSelect: boolean,
  // savePreference: boolean,
  passwordLength: number;
  password: string;
};

export type Negatives = null | undefined;

export type Primitives = number | string | boolean | bigint | Negatives;

const shuffle = <T extends unknown>(arr: T[]): T[] => arr.slice().sort(() => Math.random() - 0.5);

type PasswordGeneratorAppProps = {
  className?: string;
};

class PasswordBuilder {
  private chars: string[] = [];
  private password: string = "";

  // private symbolsList: string = "!@#$%^&*-_+=.?";
  private symbolsList: string = "~`!@#$%^&*)-_+=}]|\\/:;<>,.?";
  private numbersList: string = "0123456789";
  private lowercaseCharsList: string = "abcdefghijklmnopqrstuvwxyz";
  private uppercaseCharsList: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  constructor(private formData: FormValues) {}

  // private get userSymbols(): string {
  //   return [...new Set(this.formData.userSymbols)].join("");
  // }

  private includeSymbols() {
    this.chars = this.chars.concat(this.symbolsList.split(""));
  }

  private includeNumber() {
    this.chars = this.chars.concat(this.numbersList.split(""));
  }

  private includeLowercaseChars() {
    this.chars = this.chars.concat(this.lowercaseCharsList.split(""));
  }

  private includeUppercaseChars() {
    this.chars = this.chars.concat(this.uppercaseCharsList.split(""));
  }

  // private includeUserSymbols() {
  //   this.chars = [...new Set(this.chars.concat(this.formData.userSymbols.split("")))];
  // }

  private excludeSymbols() {
    const excludeSymbolsSet = this.formData.excludeSymbols.length ? new Set<string>(this.formData.excludeSymbols) : new Set<string>();
    this.chars = this.chars.filter(char => !excludeSymbolsSet.has(char));
  }

  private prepareCharacterSet() {
    if (this.formData.includeSymbols) this.includeSymbols();
    if (this.formData.includeNumber) this.includeNumber();
    if (this.formData.includeLowercaseChars) this.includeLowercaseChars();
    if (this.formData.includeUppercaseChars) this.includeUppercaseChars();
    if (this.formData.excludeSymbols.length) this.excludeSymbols();
    // if (this.formData.userSymbols.length) this.includeUserSymbols();
  }

  private generatePassword() {
    const shuffledChars = shuffle<string>(this.chars);

    if (this.formData.noDuplicateCharacters) {
      const existingCharsMap: Set<string> = new Set();
      for (let i = 0; i < this.formData.passwordLength; i++) {
        const randomChar = this.getRandomItem(shuffledChars);
        if (existingCharsMap.has(randomChar)) {
          i--;
          continue;
        }
        existingCharsMap.add(randomChar);
        this.password = this.password.concat(randomChar);
      }
      return;
    }

    for (let i = 0; i < this.formData.passwordLength; i++) {
      const randomChar = this.getRandomItem(shuffledChars);
      this.password = this.password.concat(randomChar);
    }
  }

  private getRandomItem(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  public get uniqueMaxAllowedLength(): number {
    if (!this.formData.noDuplicateCharacters) return Infinity;

    let value = "";
    if (this.formData.includeSymbols) value = value.concat(this.symbolsList);
    if (this.formData.includeNumber) value = value.concat(this.numbersList);
    if (this.formData.includeLowercaseChars) value = value.concat(this.lowercaseCharsList);
    if (this.formData.includeUppercaseChars) value = value.concat(this.uppercaseCharsList);
    if (this.formData.excludeSymbols.length) {
      const excludeSymbolsSet = new Set(this.formData.excludeSymbols);
      value = value.split("").filter(char => !excludeSymbolsSet.has(char)).join("")
    };
    // if (this.formData.userSymbols.length) value = value.concat(this.userSymbols);

    // console.log({value, '[...new Set(value)].length':[...new Set(value)].length});

    return [...new Set(value)].length;
  }

  private resetBuilderData() {
    this.password = "";
    this.chars = [];
  }

  public setBuilderData(data: FormValues): this {
    this.formData = data;
    return this;
  }

  private buildInternal() {
    this.resetBuilderData();

    if (
      (!this.formData.includeSymbols &&
        !this.formData.includeNumber &&
        !this.formData.includeLowercaseChars &&
        !this.formData.includeUppercaseChars) ||
      (this.formData.noDuplicateCharacters && this.formData.passwordLength > this.uniqueMaxAllowedLength)
    ) {
      // this.password = "You must select at least one character set!";
      this.password = "";
      return;
    }

    this.prepareCharacterSet();
    if (!this.chars.length) return;
    this.generatePassword();

    // const unique = Array.from(new Set(this.password));
  }

  public build(): this {
    this.buildInternal();

    // if (this.formData.noDuplicateCharacters) {
    //   if (this.password.length !== Array.from(new Set(this.password)).length) {
    //     const unique = new Set(this.password);
    //     // console.log("not unique, repeated chars: ", this.password.split("").filter(v => unique.has(v)));

    //     console.log({
    //       "this.password.length":this.password.length,
    //       "Array.from(new Set(this.password)).length":Array.from(new Set(this.password)).length,
    //       'this.password.split("")':this.password.split(""),
    //       unique,
    //       'this.password.split("").filter(v => unique.has(v))': this.password.split("").filter(v => unique.has(v))
    //     });
    //   }
    //   // do {
    //   //   this.buildInternal();
    //   // } while (this.password.length !== Array.from(new Set(this.password)).length)
    // }

    return this;
  }

  public getPassword(): string {
    return this.password;
  }
}

const charSetFieldNames: (keyof FormValues)[] = ["includeSymbols", "includeNumber", "includeLowercaseChars", "includeUppercaseChars"];

const Error: RFC<{ className?: string }> = ({ className, children }) => {
  return <span className={cn(styles.error, className)}>{children}</span>;
};

const PasswordGeneratorApp: RFC<PasswordGeneratorAppProps> = ({ className }) => {
  const { register, getValues, handleSubmit, watch, setValue, setError, formState, resetField, control } =
    useForm<FormValues>({
      mode: "onChange",
      defaultValues: {
        password: "",
        passwordLength: 30,
        includeSymbols: false,
        includeNumber: true,
        includeLowercaseChars: false,
        includeUppercaseChars: false,
        // userSymbols: "",
        excludeSymbols: "",
        // noSimilarCharacters: false,
        noDuplicateCharacters: false,
        // noSequentialCharacters: false,
        autoGenerateOnTheFirstCall: false,
        // excludeSimilarCharacters: false,
        // excludeAmbiguousCharacters: false,
        // autoSelect: false,
        // savePreference: false,
      },
    });
  const passwordBuilder = useRef(new PasswordBuilder(getValues())).current;
  const generateBtnRef = useRef<HTMLButtonElement>(null);

  const characterSet = getValues(charSetFieldNames);
  const hasOneOfCharacterSet = characterSet.some(Boolean);

  passwordBuilder.setBuilderData(watch());

  useEffect(() => {
    if (getValues().autoGenerateOnTheFirstCall) {
      generateBtnRef.current?.click();
    }
  }, []);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const pwd = passwordBuilder.setBuilderData(data).build().getPassword();

    setValue("password", pwd);
  };

  useEffect(() => {
    if (!hasOneOfCharacterSet) {
      setValue("passwordLength", 0);
      return;
    }

    if (getValues().noDuplicateCharacters && (getValues().passwordLength > passwordBuilder.uniqueMaxAllowedLength)) {
      setValue("passwordLength", passwordBuilder.uniqueMaxAllowedLength);
    }
  }, [...characterSet, getValues().noDuplicateCharacters]);


  // console.log(getValues().passwordLength, formState.errors.passwordLength?.type, passwordBuilder.uniqueMaxAllowedLength);

  return (
    <form className={cn(styles["password-generator"], className)} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label}>
        <span className={styles.labelText}>Password Length:</span>
        <Controller
          name='passwordLength'
          control={control}
          rules={{
            min: {
              value: 1,
              message: `Min password length should be 1`,
            },
            max: {
              value: passwordBuilder.uniqueMaxAllowedLength,
              message: `With selected noDuplicateCharacters, max password length restricted to ${passwordBuilder.uniqueMaxAllowedLength}`,
            },
          }}
          render={({ field }) => (
            <input
              type='number'
              min={0}
              {...field}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (+e.target.value < 0) return;
                field.onChange(e);
              }}
            />
          )}
        />
        {formState.errors.passwordLength?.type === "max" && <Error>{formState.errors.passwordLength.message}</Error>}
      </label>

      <div className={cn(styles.characterSet, { [styles.noCharacterSet]: !hasOneOfCharacterSet })}>
        <label className={styles.label}>
          <span className={styles.labelText}>Include Symbols:</span>
          <input type='checkbox' {...register("includeSymbols")} />
          <span className={styles.hint}>( e.g. @#$% )</span>
        </label>

        <label className={styles.label}>
          <span className={styles.labelText}>Include Numbers:</span>
          <input type='checkbox' {...register("includeNumber")} />
          <span className={styles.hint}>( e.g. 123456 )</span>
        </label>

        <label className={styles.label}>
          <span className={styles.labelText}>Include Lowercase Characters:</span>
          <input type='checkbox' {...register("includeLowercaseChars")} />
          <span className={styles.hint}>( e.g. abcdefgh )</span>
        </label>

        <label className={styles.label}>
          <span className={styles.labelText}>Include Uppercase Characters:</span>
          <input type='checkbox' {...register("includeUppercaseChars")} />
          <span className={styles.hint}>( e.g. ABCDEFGH )</span>
        </label>
        {!hasOneOfCharacterSet && <Error>One of character sets should be chosen</Error>}
      </div>

      {/* <label className={styles.label}>
        <span className={styles.labelText}>Your character set:</span>
        <input type='text' {...register("userSymbols")} />
        <span className={styles.hint}>( additional your character set )</span>
      </label> */}

      <label className={styles.label}>
        <span className={styles.labelText}>Exclude characters from generation:</span>
        <input type='text' {...register("excludeSymbols")} />
        <span className={styles.hint}>( this symbols will not be included into generation )</span>
      </label>

      {/* <label className={styles.label}>
      <span className={styles.labelText}>No Similar Characters:</span>
      <input type="checkbox" {...register('noSimilarCharacters')} />
      <span className={styles.hint}>( don't use characters like i, l, 1, L, o, 0, O, etc. )</span>
    </label> */}

      <label className={styles.label}>
        <span className={styles.labelText}>No Duplicate Characters:</span>
        <input type='checkbox' {...register("noDuplicateCharacters")} />
        <span className={styles.hint}>( don't use the same character more than once )</span>
      </label>

      {/* <label className={styles.label}>
      <span className={styles.labelText}>No Sequential Characters:</span>
      <input type="checkbox" {...register('noSequentialCharacters')} />
      <span className={styles.hint}>( don't use sequential characters, e.g. abc, 789 )</span>
    </label> */}

      <label className={styles.label}>
        <span className={styles.labelText}>Auto Generate On The First Call:</span>
        <input type='checkbox' {...register("autoGenerateOnTheFirstCall")} />
        <span className={styles.hint}>( generate passwords automatically when you open this page )</span>
      </label>

      {/* <label className={styles.label}>
      <span className={styles.labelText}>Exclude Similar Characters:</span>
      <input type="checkbox" {...register('excludeSimilarCharacters')} />
      <span className={styles.hint}>( e.g. i, l, 1, L, o, 0, O )</span>
    </label> */}

      {/* <label className={styles.label}>
      <span className={styles.labelText}>Exclude Ambiguous Characters:</span>
      <input type="checkbox" {...register('excludeAmbiguousCharacters')} />
      <span className={styles.hint}>{"( { } [ ] ( ) / \\ ' \" ` ~ , ; : . < > )"}</span>
    </label> */}

      {/* <label className={styles.label}>
      <span className={styles.labelText}>Auto-Select:</span>
      <input type="checkbox" {...register('autoSelect')} />
      <span className={styles.hint}>( select the password automatically )</span>
    </label> */}

      {/* <label className={styles.label}>
      <span className={styles.labelText}>Save My Preference:</span>
      <input type="checkbox" {...register('savePreference')} />
      <span className={styles.hint}>( save all the settings above for later use )</span>
    </label> */}

      {/* <label className={styles.label}>
      <span className={styles.labelText}>Quantity:</span>
      <input type="number" name="passwordLength" value={1} />
    </label> */}

      <label className={styles.label}>
        <button type='submit' ref={generateBtnRef} disabled={Number(getValues().passwordLength) === 0}>
          Generate
        </button>
      </label>

      <label className={`${styles.label} ${styles.labelPassword}`}>
        <span className={styles.labelText}>Your new password:</span>
        <div>
          <input type='text' {...register("password")} />
          <button type='button'>Copy</button>
        </div>
        <span className={styles.hint}>( save all the settings above for later use )</span>
      </label>

      {/* <div className={styles.metric}>Password Strength:</div>
    <div className={styles.metric}>Password Entropy:</div>

    <div className={styles.info}>Remember your password: Remember your password with the first character of each word in this sentence.</div> */}
      {/* <pre> */}
      {/* <code>{JSON.stringify({ "watch().password.length": watch().password.length }, null, 2)}</code>
        <br /> */}
      {/* <code>{JSON.stringify(watch(), null, 2)}</code> */}
      {/* <br />
        formState:
        <br />
        <code>{JSON.stringify(formState, null, 2)}</code> */}
      {/* <code>{JSON.stringify(Object.entries(formState.errors), null, 2)}</code> */}
      {/* </pre> */}
    </form>
  );
};

export { PasswordGeneratorApp };
