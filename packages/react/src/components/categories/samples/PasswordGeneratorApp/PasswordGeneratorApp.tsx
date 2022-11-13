import React, { useEffect, useRef } from "react";
import { useForm, SubmitHandler, DefaultValues, Controller } from "react-hook-form";
import { copyTextToClipboard } from "./PasswordGeneratorApp.utils";
import cn from "classnames";
import styles from "./PasswordGeneratorApp.module.scss";

enum FieldNames {
  includeSymbols = "includeSymbols",
  includeNumber = "includeNumber",
  includeLowercaseChars = "includeLowercaseChars",
  includeUppercaseChars = "includeUppercaseChars",

  // userSymbols = "userSymbols",
  excludeSymbols = "excludeSymbols",

  // noSimilarCharacters: boolean,// noSequentialCharacters = "noSimilarCharacters",
  autoGenerateOnTheFirstCall = "autoGenerateOnTheFirstCall",
  // excludeSimilarCharacters = "excludeSimilarCharacters",
  noDuplicateCharacters = "noDuplicateCharacters",
  // excludeAmbiguousCharacters = "excludeAmbiguousCharacters",
  autoSelect = "autoSelect",
  savePreference = "savePreference",
  passwordLength = "passwordLength",
  password = "password",
}

type FieldType<K extends string, V extends string | boolean | number> = Record<K, V>;

type FormValues = FieldType<FieldNames.includeSymbols, boolean> &
  FieldType<FieldNames.includeNumber, boolean> &
  FieldType<FieldNames.includeLowercaseChars, boolean> &
  FieldType<FieldNames.includeUppercaseChars, boolean> &
  FieldType<FieldNames.excludeSymbols, string> &
  FieldType<FieldNames.autoGenerateOnTheFirstCall, boolean> &
  FieldType<FieldNames.autoSelect, boolean> &
  FieldType<FieldNames.noDuplicateCharacters, boolean> &
  FieldType<FieldNames.savePreference, boolean> &
  FieldType<FieldNames.passwordLength, number> &
  FieldType<FieldNames.password, string>;

// export type Negatives = null | undefined;

// export type Primitives = number | string | boolean | bigint | Negatives;

const shuffle = <T extends unknown>(arr: T[]): T[] => arr.slice().sort(() => Math.random() - 0.5);

type PasswordGeneratorAppProps = {
  className?: string;
};

class PasswordBuilder {
  private chars: string[] = [];
  private password: string = "";

  // private symbolList: string = "!@#$%^&*-_+=.?";
  private symbolList: string = "~`!@#$%^&*)-_+=}]|\\/:;<>,.?";
  private numberList: string = "0123456789";
  private lowercaseCharList: string = "abcdefghijklmnopqrstuvwxyz";
  private uppercaseCharList: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  constructor(private formData: FormValues) {}

  // private get userSymbols(): string {
  //   return [...new Set(this.formData.userSymbols)].join("");
  // }

  public getSymbolList() {
    return this.symbolList;
  }

  public getNumberList() {
    return this.numberList;
  }

  public getLowercaseCharList() {
    return this.lowercaseCharList;
  }

  public getUppercaseCharList() {
    return this.uppercaseCharList;
  }

  public get uniqueMaxAllowedLength(): number {
    if (!this.formData.noDuplicateCharacters) return Infinity;

    let value = "";
    if (this.formData.includeSymbols) value = value.concat(this.symbolList);
    if (this.formData.includeNumber) value = value.concat(this.numberList);
    if (this.formData.includeLowercaseChars) value = value.concat(this.lowercaseCharList);
    if (this.formData.includeUppercaseChars) value = value.concat(this.uppercaseCharList);
    if (this.formData.excludeSymbols.length) {
      const excludeSymbolsSet = new Set(this.formData.excludeSymbols);
      value = value
        .split("")
        .filter((char) => !excludeSymbolsSet.has(char))
        .join("");
    }
    // if (this.formData.userSymbols.length) value = value.concat(this.userSymbols);

    // console.log({value, '[...new Set(value)].length':[...new Set(value)].length});

    return [...new Set(value)].length;
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

  public setBuilderData(data: FormValues): this {
    this.formData = data;
    return this;
  }

  public getPassword(): string {
    return this.password;
  }

  private includeSymbols() {
    this.chars = this.chars.concat(this.symbolList.split(""));
  }

  private includeNumber() {
    this.chars = this.chars.concat(this.numberList.split(""));
  }

  private includeLowercaseChars() {
    this.chars = this.chars.concat(this.lowercaseCharList.split(""));
  }

  private includeUppercaseChars() {
    this.chars = this.chars.concat(this.uppercaseCharList.split(""));
  }

  // private includeUserSymbols() {
  //   this.chars = [...new Set(this.chars.concat(this.formData.userSymbols.split("")))];
  // }

  private excludeSymbols() {
    const excludeSymbolsSet = this.formData.excludeSymbols.length
      ? new Set<string>(this.formData.excludeSymbols)
      : new Set<string>();
    this.chars = this.chars.filter((char) => !excludeSymbolsSet.has(char));
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

  private resetBuilderData() {
    this.password = "";
    this.chars = [];
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
}

const localStorageKey = "password-generator-preferences";

const charSetFieldNames: (keyof FormValues)[] = [
  FieldNames.includeSymbols,
  FieldNames.includeNumber,
  FieldNames.includeLowercaseChars,
  FieldNames.includeUppercaseChars,
];

const Error: RFC<{ className?: string }> = ({ className, children }) => {
  return <span className={cn(styles.error, className)}>{children}</span>;
};

const getDefaultFormValues = (initialDefaultValues: DefaultValues<FormValues>): DefaultValues<FormValues> => {
  const savedDefaultValues = localStorage.getItem(localStorageKey);
  if (savedDefaultValues) {
    return {
      ...initialDefaultValues,
      ...JSON.parse(savedDefaultValues),
    };
  }
  return initialDefaultValues;
};

const PasswordGeneratorApp: RFC<PasswordGeneratorAppProps> = ({ className }) => {
  const { register, getValues, handleSubmit, watch, setValue, setError, formState, resetField, trigger, control } =
    useForm<FormValues>({
      mode: "onChange",
      defaultValues: getDefaultFormValues({
        [FieldNames.password]: "",
        [FieldNames.passwordLength]: 20,
        [FieldNames.includeSymbols]: false,
        [FieldNames.includeNumber]: true,
        [FieldNames.includeLowercaseChars]: true,
        [FieldNames.includeUppercaseChars]: true,
        // [FieldNames.userSymbols]: "",
        [FieldNames.excludeSymbols]: "",
        [FieldNames.noDuplicateCharacters]: false,
        [FieldNames.autoGenerateOnTheFirstCall]: false,
        [FieldNames.savePreference]: false,
        // [FieldNames.noSimilarCharacters]: false,
        // [FieldNames.noSequentialCharacters]: false,
        // [FieldNames.excludeSimilarCharacters]: false,
        // [FieldNames.excludeAmbiguousCharacters]: false,
        [FieldNames.autoSelect]: false,
      }),
    });
  const passwordBuilder = useRef(new PasswordBuilder(getValues())).current;
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const generateBtnRef = useRef<HTMLButtonElement>(null);
  const generateCount = useRef(0);

  const characterSet = getValues(charSetFieldNames);
  const hasOneOfCharacterSet = characterSet.some(Boolean);

  const { isValid, isValidating } = formState;

  passwordBuilder.setBuilderData(watch());

  useEffect(() => {
    trigger();
  }, []);

  // autoGenerateOnTheFirstCall  option
  useEffect(() => {
    if (isValid && generateCount.current < 2) {
      if (getValues().autoGenerateOnTheFirstCall) {
        generateBtnRef.current?.click();
      }
      if (getValues().autoSelect) {
        setTimeout(() => {
          passwordInputRef.current?.select();
        }, 10);
      }
    }
  }, [isValid]);

  // autoSelect & savePreference options
  useEffect(() => {
    if (isValid && generateCount.current < 2) {
      if (getValues().autoSelect) {
        passwordInputRef.current?.select();
      }
    }

    if (isValid && getValues().savePreference) {
      const valuesToSave = (
        Object.entries(getValues()) as [k: keyof FormValues, v: string | number | boolean][]
      ).filter(([key]) => key !== FieldNames.password);

      localStorage.setItem(localStorageKey, JSON.stringify(Object.fromEntries(valuesToSave)));
    } else if (!getValues().savePreference && localStorage.getItem(localStorageKey)) {
      localStorage.removeItem(localStorageKey);
    }
  }, [getValues(), isValid]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const pwd = passwordBuilder.setBuilderData(data).build().getPassword();

    setValue(FieldNames.password, pwd);
    generateCount.current++;
  };

  useEffect(() => {
    if (!hasOneOfCharacterSet) {
      setValue(FieldNames.passwordLength, 0);
      trigger(FieldNames.passwordLength);
      return;
    }

    if (getValues().noDuplicateCharacters && getValues().passwordLength > passwordBuilder.uniqueMaxAllowedLength) {
      setValue(FieldNames.passwordLength, passwordBuilder.uniqueMaxAllowedLength);
      trigger(FieldNames.passwordLength);
    }
  }, [...characterSet, ...getValues([FieldNames.noDuplicateCharacters, FieldNames.excludeSymbols])]);

  return (
    <form className={cn(styles["password-generator"], className)} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label}>
        <span className={styles.labelText}>Password Length:</span>
        <Controller
          name={FieldNames.passwordLength}
          control={control}
          defaultValue={formState.defaultValues?.passwordLength}
          rules={{
            required: {
              value: true,
              message: "Password Length is required",
            },
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
        {formState.errors.passwordLength && <Error>{formState.errors.passwordLength.message}</Error>}
        {/* <Error>{formState.errors.passwordLength.message}</Error> */}
      </label>

      <div className={cn(styles.characterSet, { [styles.noCharacterSet]: !hasOneOfCharacterSet })}>
        <label className={styles.label}>
          <span className={styles.labelText}>Include Symbols:</span>
          <input type='checkbox' className={styles.checkbox} {...register(FieldNames.includeSymbols)} />
          <span className={styles.hint}>( e.g. {passwordBuilder.getSymbolList()} )</span>
        </label>

        <label className={styles.label}>
          <span className={styles.labelText}>Include Numbers:</span>
          <input type='checkbox' className={styles.checkbox} {...register(FieldNames.includeNumber)} />
          <span className={styles.hint}>( e.g. {passwordBuilder.getNumberList()} )</span>
        </label>

        <label className={styles.label}>
          <span className={styles.labelText}>Include Lowercase Characters:</span>
          <input type='checkbox' className={styles.checkbox} {...register(FieldNames.includeLowercaseChars)} />
          <span className={styles.hint}>( e.g. {passwordBuilder.getLowercaseCharList()} )</span>
        </label>

        <label className={styles.label}>
          <span className={styles.labelText}>Include Uppercase Characters:</span>
          <input type='checkbox' className={styles.checkbox} {...register(FieldNames.includeUppercaseChars)} />
          <span className={styles.hint}>( e.g. {passwordBuilder.getUppercaseCharList()} )</span>
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
        <input type='text' {...register(FieldNames.excludeSymbols)} />
        <span className={styles.hint}>( this symbols will not be included into generation )</span>
      </label>

      {/* <label className={styles.label}>
      <span className={styles.labelText}>No Similar Characters:</span>
      <input type="checkbox" {...register('noSimilarCharacters')} />
      <span className={styles.hint}>( don't use characters like i, l, 1, L, o, 0, O, etc. )</span>
    </label> */}

      <label className={styles.label}>
        <span className={styles.labelText}>No Duplicate Characters:</span>
        {/* <input type='checkbox' {...register(FieldNames.noDuplicateCharacters)} /> */}
        <Controller
          name={FieldNames.noDuplicateCharacters}
          control={control}
          defaultValue={formState.defaultValues?.noDuplicateCharacters}
          render={({ field: { name, onBlur, onChange, ref, value } }) => (
            <input
              type='checkbox'
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              checked={value}
              ref={ref}
              className={styles.input}
            />
          )}
        />
        <span className={styles.hint}>( don't use the same character more than once )</span>
      </label>

      {/* <label className={styles.label}>
      <span className={styles.labelText}>No Sequential Characters:</span>
      <input type="checkbox" {...register('noSequentialCharacters')} />
      <span className={styles.hint}>( don't use sequential characters, e.g. abc, 789 )</span>
    </label> */}

      <label className={styles.label}>
        <span className={styles.labelText}>Auto Generate On The First Call:</span>
        <input type='checkbox' {...register(FieldNames.autoGenerateOnTheFirstCall)} />
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

      <label className={styles.label}>
        <span className={styles.labelText}>Auto-Select:</span>
        <input type='checkbox' {...register(FieldNames.autoSelect)} />
        <span className={styles.hint}>( select the password automatically )</span>
      </label>

      <label className={styles.label}>
        <span className={styles.labelText}>Save My Preference:</span>
        <input type='checkbox' {...register(FieldNames.savePreference)} />
        <span className={styles.hint}>( save all the settings above for later use )</span>
      </label>

      {/* <label className={styles.label}>
      <span className={styles.labelText}>Quantity:</span>
      <input type="number" name="passwordLength" value={1} />
    </label> */}

      <label className={styles.label}>
        <button
          type='submit'
          ref={generateBtnRef}
          disabled={!isValid}>
          Generate
        </button>
      </label>

      <label className={`${styles.label} ${styles.labelPassword}`}>
        <span className={styles.labelText}>Your new password:</span>
        <div>
          <Controller
            name={FieldNames.password}
            control={control}
            defaultValue={formState.defaultValues?.password}
            render={({ field }) => <input type='text' className={styles.input} {...field} ref={passwordInputRef} />}
          />
          <button
            type='button'
            onClick={() => {
              passwordInputRef.current?.select();
              copyTextToClipboard(getValues().password);
            }}>
            Copy
          </button>
        </div>
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
