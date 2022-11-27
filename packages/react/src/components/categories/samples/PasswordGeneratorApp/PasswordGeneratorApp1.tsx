import React, { useEffect, useRef } from "react";
import { useForm, SubmitHandler, DefaultValues, Controller } from "react-hook-form";
import { LocalStorageManager } from "@/utils";
import { copyTextToClipboard } from "./PasswordGeneratorApp.utils";
import cn from "classnames";
import styles from "./PasswordGeneratorApp.module.scss";

const SYMBOL_LIST = "!\";#$%&'()*+,-./:<=>?@[]^_`{|}~";
const NUMBER_LIST = "0123456789";
const LOWERCASE_CHAR_LIST = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE_CHAR_LIST = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

enum FieldNames {
  symbols = "symbols",
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

type AllowedFiledType = string | boolean | number;
type FieldType<K extends FieldNames, V extends AllowedFiledType> = Record<K, V>;

type FormValues = FieldType<FieldNames.symbols, string> &
  FieldType<FieldNames.includeSymbols, boolean> &
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

type PersistedFormValues = Omit<FormValues, "password">;

// export type Negatives = null | undefined;

// export type Primitives = number | string | boolean | bigint | Negatives;

const shuffle = <T extends unknown>(arr: T[]): T[] => arr.slice().sort(() => Math.random() - 0.5);

type PasswordGeneratorAppProps = {
  className?: string;
};

class PasswordBuilder {
  private chars: string[] = [];
  private password: string = "";
  private uniqueMaxAllowedLength: number = Infinity;

  // private symbolList: string = "!@#$%^&*-_+=.?";
  // private symbolList: string = "~`!@#$%^&*)-_+=}]|\\/:;<>,.?";
  // private symbolList: string = "`~!@#$%^&*()-=_+[{]}|;':\",.<>/?";
  // private symbolList: string = "~!@#$%^&*()-=_+[{]}|;:,.<>?";
  // public static readonly symbolList: string = "!\";#$%&'()*+,-./:;<=>?@[]^_`{|}~";
  // private numberList: string = "0123456789";
  // private lowercaseCharList: string = "abcdefghijklmnopqrstuvwxyz";
  // private uppercaseCharList: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  constructor(private formData: FormValues) {}

  // private get userSymbols(): string {
  //   return [...new Set(this.formData.userSymbols)].join("");
  // }

  // public getSymbolList() {
  //   return this.symbolList;
  // }

  // private get symbolList() {
  //   return PasswordBuilder.symbolList;
  // }

  // public getNumberList() {
  //   return this.numberList;
  // }

  // public getLowercaseCharList() {
  //   return this.lowercaseCharList;
  // }

  // public getUppercaseCharList() {
  //   return this.uppercaseCharList;
  // }

  public setUniqueMaxAllowedLength(): this {
    if (!this.formData.noDuplicateCharacters) {
      this.uniqueMaxAllowedLength = Infinity;
      return this;
    }

    let value = "";
    if (this.formData.includeSymbols && this.formData.symbols.length) value = value.concat(this.formData.symbols);
    if (this.formData.includeNumber) value = value.concat(NUMBER_LIST);
    if (this.formData.includeLowercaseChars) value = value.concat(LOWERCASE_CHAR_LIST);
    if (this.formData.includeUppercaseChars) value = value.concat(UPPERCASE_CHAR_LIST);
    if (this.formData.excludeSymbols.length) {
      const excludeSymbolsSet = new Set(this.formData.excludeSymbols);
      value = value
        .split("")
        .filter((char) => !excludeSymbolsSet.has(char))
        .join("");
    }

    this.uniqueMaxAllowedLength = [...new Set(value)].length;

    return this;
  }

  public getUniqueMaxAllowedLength(): number {
    return this.uniqueMaxAllowedLength;
  }

  // public get uniqueMaxAllowedLength(): number {
  //   if (!this.formData.noDuplicateCharacters) return Infinity;

  //   let value = "";
  //   if (this.formData.includeSymbols && this.formData.symbols.length) value = value.concat(this.formData.symbols);
  //   if (this.formData.includeNumber) value = value.concat(NUMBER_LIST);
  //   if (this.formData.includeLowercaseChars) value = value.concat(LOWERCASE_CHAR_LIST);
  //   if (this.formData.includeUppercaseChars) value = value.concat(UPPERCASE_CHAR_LIST);
  //   if (this.formData.excludeSymbols.length) {
  //     const excludeSymbolsSet = new Set(this.formData.excludeSymbols);
  //     value = value
  //       .split("")
  //       .filter((char) => !excludeSymbolsSet.has(char))
  //       .join("");
  //   }

  //   return [...new Set(value)].length;
  // }

  public build(): this {
    this.resetBuilderData();

    if (
      (!this.formData.includeSymbols &&
        !this.formData.includeNumber &&
        !this.formData.includeLowercaseChars &&
        !this.formData.includeUppercaseChars) ||
      (this.formData.noDuplicateCharacters && this.formData.passwordLength > this.uniqueMaxAllowedLength)
    ) {
      this.password = "";
      return this;
    }

    this.prepareCharacterSet();
    if (!this.chars.length) return this;
    this.generatePassword();

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
    this.chars = this.chars.concat(this.formData.symbols.split(""));
  }

  private includeNumber() {
    this.chars = this.chars.concat(NUMBER_LIST.split(""));
  }

  private includeLowercaseChars() {
    this.chars = this.chars.concat(LOWERCASE_CHAR_LIST.split(""));
  }

  private includeUppercaseChars() {
    this.chars = this.chars.concat(UPPERCASE_CHAR_LIST.split(""));
  }

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
}

const passwordGeneratorLSManager = new LocalStorageManager<Partial<{ preferences: PersistedFormValues }>>(
  "password-generator"
);
// const testLSManager = new LocalStorageManager<Partial<{a:string; b:number}>>("ls-test");
const testLSManager = new LocalStorageManager<Partial<number>>("ls-test");
testLSManager.override(1);
console.log(testLSManager.getAll());
testLSManager.override(2);
console.log(testLSManager.getAll());
testLSManager.override(0);
console.log(testLSManager.getAll());
testLSManager.clear();

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
  const savedDefaultValues = passwordGeneratorLSManager.get("preferences");
  if (savedDefaultValues) {
    return {
      ...initialDefaultValues,
      ...savedDefaultValues,
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
        [FieldNames.passwordLength]: 16,
        [FieldNames.symbols]: SYMBOL_LIST,
        [FieldNames.includeSymbols]: false,
        [FieldNames.includeNumber]: true,
        [FieldNames.includeLowercaseChars]: true,
        [FieldNames.includeUppercaseChars]: true,
        // [FieldNames.userSymbols]: "",
        [FieldNames.excludeSymbols]: "",
        [FieldNames.noDuplicateCharacters]: true,
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
  const passwordInputRef = useRef<HTMLTextAreaElement>(null);
  const generateBtnRef = useRef<HTMLButtonElement>(null);
  const generateCount = useRef(0);

  const characterSet = getValues(charSetFieldNames);
  const hasOneOfCharacterSet = characterSet.some(Boolean);

  const { isValid, isValidating, defaultValues, errors } = formState;

  // preserve passwordBuilder with actual form data
  const actualFormValues = watch();
  passwordBuilder.setBuilderData(actualFormValues).setUniqueMaxAllowedLength();

  // validate on mount
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
      const valuesToSave = Object.fromEntries(
        (Object.entries(getValues()) as [k: keyof FormValues, v: AllowedFiledType][]).filter(
          ([key]) => key !== FieldNames.password
        )
      ) as PersistedFormValues;

      passwordGeneratorLSManager.set("preferences", valuesToSave);
    } else if (!getValues().savePreference && passwordGeneratorLSManager.has("preferences")) {
      passwordGeneratorLSManager.remove("preferences");
    }
  }, [getValues(), isValid]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const pwd = passwordBuilder.setBuilderData(data).build().getPassword();

    setValue(FieldNames.password, pwd);
    generateCount.current++;
  };

  // useEffect(() => {
  // if (!hasOneOfCharacterSet) {
  //   setValue(FieldNames.passwordLength, 0);
  //   trigger(FieldNames.passwordLength);
  //   return;
  // }

  // if (getValues().noDuplicateCharacters && getValues().passwordLength > passwordBuilder.getUniqueMaxAllowedLength()) {
  //   setValue(FieldNames.passwordLength, passwordBuilder.getUniqueMaxAllowedLength());
  //   trigger(FieldNames.passwordLength);
  // }
  // }, [...characterSet, ...getValues([FieldNames.noDuplicateCharacters, FieldNames.excludeSymbols])]);

  // console.log(Object.entries(errors), isValid);

  return (
    <form className={cn(styles["password-generator"], className)} onSubmit={handleSubmit(onSubmit)}>
      <label className={cn(styles.label, styles.labelPasswordLength)}>
        <span className={styles.labelText}>Password Length:</span>
        <Controller
          name={FieldNames.passwordLength}
          control={control}
          defaultValue={defaultValues?.passwordLength}
          rules={{
            required: {
              value: true,
              message: "Password Length is required",
            },
            // max: {
            //   value: passwordBuilder.getUniqueMaxAllowedLength(),
            //   message: `With selected noDuplicateCharacters, max password length restricted to ${passwordBuilder.getUniqueMaxAllowedLength()}`,
            // },
            validate: {
              maxPasswordLength: (value) => {
                return value <= passwordBuilder.getUniqueMaxAllowedLength();
              },
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
        {errors.passwordLength && (
          <div className={styles.errorWrapper}>
            {errors.passwordLength.type === "required" && <Error>{errors.passwordLength.message}</Error>}
            {getValues().noDuplicateCharacters && errors.passwordLength.type === "maxPasswordLength" && (
              <>
                <Error>{`With selected noDuplicateCharacters, max password length restricted to ${passwordBuilder.getUniqueMaxAllowedLength()}`}</Error>
                <button
                  type='button'
                  onClick={() => {
                    setValue(FieldNames.passwordLength, passwordBuilder.getUniqueMaxAllowedLength());
                    trigger(FieldNames.passwordLength);
                  }}>
                  Set {passwordBuilder.getUniqueMaxAllowedLength()} length
                </button>
              </>
            )}
          </div>
        )}
      </label>

      <div className={cn(styles.characterSet, { [styles.noCharacterSet]: !hasOneOfCharacterSet })}>
        <label className={styles.label}>
          <span className={styles.labelText}>Include Numbers:</span>
          <Controller
            name={FieldNames.includeNumber}
            control={control}
            defaultValue={defaultValues?.includeNumber}
            render={({ field: { onChange, value, ...restFieldProps } }) => (
              <input
                {...restFieldProps}
                type='checkbox'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange(e);
                  trigger(FieldNames.passwordLength);
                }}
                checked={value}
                className={styles.checkbox}
              />
            )}
          />
          <span className={styles.hint}>( e.g. {NUMBER_LIST} )</span>
        </label>

        <label className={styles.label}>
          <span className={styles.labelText}>Include Lowercase Characters:</span>
          <Controller
            name={FieldNames.includeLowercaseChars}
            control={control}
            defaultValue={defaultValues?.includeLowercaseChars}
            render={({ field: { onChange, value, ...restFieldProps } }) => (
              <input
                {...restFieldProps}
                type='checkbox'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange(e);
                  trigger(FieldNames.passwordLength);
                }}
                checked={value}
                className={styles.checkbox}
              />
            )}
          />
          <span className={styles.hint}>( e.g. {LOWERCASE_CHAR_LIST} )</span>
        </label>

        <label className={styles.label}>
          <span className={styles.labelText}>Include Uppercase Characters:</span>
          <Controller
            name={FieldNames.includeUppercaseChars}
            control={control}
            defaultValue={defaultValues?.includeUppercaseChars}
            render={({ field: { onChange, value, ...restFieldProps } }) => (
              <input
                {...restFieldProps}
                type='checkbox'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange(e);
                  trigger(FieldNames.passwordLength);
                }}
                checked={value}
                className={styles.checkbox}
              />
            )}
          />
          <span className={styles.hint}>( e.g. {UPPERCASE_CHAR_LIST} )</span>
        </label>

        <label className={cn(styles.label, styles.labelSymbols)}>
          <span className={styles.labelText}>Include Symbols:</span>
          <div className={styles.inputWrapper}>
            {/* TODO: validation error */}
            <Controller
              name={FieldNames.includeSymbols}
              control={control}
              defaultValue={defaultValues?.includeSymbols}
              render={({ field: { onChange, value, ...restFieldProps } }) => (
                <input
                  {...restFieldProps}
                  type='checkbox'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange(e);
                    trigger([FieldNames.passwordLength, FieldNames.symbols]);
                  }}
                  checked={value}
                  className={styles.checkbox}
                />
              )}
            />
            <Controller
              name={FieldNames.symbols}
              control={control}
              defaultValue={defaultValues?.symbols}
              rules={{
                validate: {
                  hasValue: (value) => {
                    if (getValues(FieldNames.includeSymbols)) {
                      return value !== "";
                    }
                    return true;
                  },
                  containsUniqueSymbols: (value) => {
                    if (getValues([FieldNames.noDuplicateCharacters, FieldNames.includeSymbols]).every(Boolean)) {
                      return value.length === [...new Set(value)].join("").length;
                    }
                    return true;
                  },
                },
              }}
              render={({ field: { onChange, value, ...restFieldProps } }) => (
                <input
                  {...restFieldProps}
                  type='text'
                  onChange={(e) => {
                    onChange(e);
                    if (getValues([FieldNames.noDuplicateCharacters, FieldNames.includeSymbols])) {
                      trigger(FieldNames.passwordLength);
                    }
                    trigger(FieldNames.symbols);
                  }}
                  value={value}
                  className={styles.input}
                />
              )}
            />
          </div>
          {errors.symbols?.type === "hasValue" && (
            <Error>This field can not be empty with "Include Symbols" checked</Error>
          )}
          {errors.symbols?.type === "containsUniqueSymbols" && <Error>All symbols should be unique</Error>}
        </label>

        {!hasOneOfCharacterSet && <Error>One of character sets should be chosen</Error>}
      </div>

      {/* <label className={styles.label}>
        <span className={styles.labelText}>Your character set:</span>
        <input type="text" {...register("userSymbols")} />
        <span className={styles.hint}>( additional your character set )</span>
      </label> */}

      <label className={styles.label}>
        <span className={styles.labelText}>Exclude characters from generation:</span>
        <Controller
          name={FieldNames.excludeSymbols}
          control={control}
          defaultValue={defaultValues?.excludeSymbols}
          render={({ field: { onChange, ...restFieldProps } }) => (
            <input
              {...restFieldProps}
              type='text'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e);
                trigger(FieldNames.passwordLength);
              }}
              className={styles.checkbox}
            />
          )}
        />
        <span className={styles.hint}>( this symbols will not be included into generation )</span>
      </label>

      {/* <label className={styles.label}>
      <span className={styles.labelText}>No Similar Characters:</span>
      <input type="checkbox" {...register('noSimilarCharacters')} />
      <span className={styles.hint}>( don't use characters like i, l, 1, L, o, 0, O, etc. )</span>
    </label> */}

      <label className={styles.label}>
        <span className={styles.labelText}>No Duplicate Characters:</span>
        <Controller
          name={FieldNames.noDuplicateCharacters}
          control={control}
          defaultValue={defaultValues?.noDuplicateCharacters}
          render={({ field: { onChange, value, ...restFieldProps } }) => (
            <input
              {...restFieldProps}
              type='checkbox'
              className={styles.input}
              checked={value}
              onChange={(e) => {
                onChange(e);
                trigger([FieldNames.passwordLength, FieldNames.symbols]);
              }}
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
        <button type='submit' ref={generateBtnRef} disabled={!isValid}>
          Generate
        </button>
      </label>

      <label className={cn(styles.label, styles.labelPassword)}>
        <span className={styles.labelText}>Your new password:</span>
        <div className={styles.inputWrapper}>
          <Controller
            name={FieldNames.password}
            control={control}
            defaultValue={defaultValues?.password}
            render={({ field }) => <textarea rows={4} className={styles.input} {...field} ref={passwordInputRef} />}
          />

          <button
            type='button'
            onClick={() => {
              passwordInputRef.current?.select();
              copyTextToClipboard(getValues().password);
            }}
            className={styles.button}>
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
      {/* <code>{JSON.stringify(Object.entries(errors), null, 2)}</code> */}
      {/* </pre> */}
    </form>
  );
};

export { PasswordGeneratorApp };
