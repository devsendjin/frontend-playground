import { ChangeEvent, useEffect, useRef } from "react";
import { useForm, SubmitHandler, DefaultValues, Controller } from "react-hook-form";
import cn from "classnames";
import { LocalStorageManager } from "@/utils";
import { Button, Description, Input, Label, Row, Textarea, Error } from "./components";
import { copyTextToClipboard } from "./PasswordGeneratorApp.utils";
import styles from "./PasswordGeneratorApp.module.scss";

const SYMBOL_LIST = "!\";#$%&'()*+,-./:<=>?@[]^_`{|}~";
const NUMBER_LIST = "0123456789";
const LOWERCASE_CHAR_LIST = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE_CHAR_LIST = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MAX_ALLOWED_LENGTH = 10000;

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
type FieldType<V> = V extends AllowedFiledType ? V : never;

type FormValues = {
  [FieldNames.symbols]: FieldType<string>;
  [FieldNames.includeSymbols]: FieldType<boolean>;
  [FieldNames.includeNumber]: FieldType<boolean>;
  [FieldNames.includeLowercaseChars]: FieldType<boolean>;
  [FieldNames.includeUppercaseChars]: FieldType<boolean>;
  [FieldNames.excludeSymbols]: FieldType<string>;
  [FieldNames.autoGenerateOnTheFirstCall]: FieldType<boolean>;
  [FieldNames.autoSelect]: FieldType<boolean>;
  [FieldNames.noDuplicateCharacters]: FieldType<boolean>;
  [FieldNames.savePreference]: FieldType<boolean>;
  [FieldNames.passwordLength]: FieldType<number>;
  [FieldNames.password]: FieldType<string>;
};
type LSFormValues = Omit<FormValues, "password">;

const shuffle = <T extends unknown>(arr: T[]): T[] => arr.slice().sort(() => Math.random() - 0.5);
const randomArrayItem = <T extends unknown>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

type PasswordGeneratorAppProps = {
  className?: string;
};

class PasswordBuilder {
  private chars: string[] = [];
  private password: string = "";
  private maxAllowedLength: number = MAX_ALLOWED_LENGTH;

  constructor(private formData: FormValues) {}

  public setMaxAllowedLength(): this {
    if (!this.formData.noDuplicateCharacters) {
      this.maxAllowedLength = MAX_ALLOWED_LENGTH;
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

    this.maxAllowedLength = [...new Set(value)].length;

    return this;
  }

  public getMaxAllowedLength(): number {
    return this.maxAllowedLength;
  }

  public build(): this {
    this.resetBuilderData();

    if (
      (!this.formData.includeSymbols &&
        !this.formData.includeNumber &&
        !this.formData.includeLowercaseChars &&
        !this.formData.includeUppercaseChars) ||
      (this.formData.noDuplicateCharacters && this.formData.passwordLength > this.maxAllowedLength)
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
    const excludeSymbolsSet =
      this.formData.excludeSymbols.length > 0 ? new Set<string>(this.formData.excludeSymbols) : new Set<string>();
    this.chars = this.chars.filter((char) => !excludeSymbolsSet.has(char));
  }

  private prepareCharacterSet() {
    if (this.formData.includeSymbols) this.includeSymbols();
    if (this.formData.includeNumber) this.includeNumber();
    if (this.formData.includeLowercaseChars) this.includeLowercaseChars();
    if (this.formData.includeUppercaseChars) this.includeUppercaseChars();
    if (this.formData.excludeSymbols.length) this.excludeSymbols();
  }

  private generatePassword(): this {
    const shuffledChars = shuffle<string>(this.chars);

    if (this.formData.noDuplicateCharacters) {
      const existingCharsMap: Set<string> = new Set();
      for (let i = 0; i < this.formData.passwordLength; i++) {
        const randomChar = randomArrayItem(shuffledChars);
        if (existingCharsMap.has(randomChar)) {
          i--;
          continue;
        }
        existingCharsMap.add(randomChar);
        this.password = this.password.concat(randomChar);
      }
      return this;
    }

    for (let i = 0; i < this.formData.passwordLength; i++) {
      this.password = this.password.concat(randomArrayItem(shuffledChars));
    }

    return this;
  }

  private resetBuilderData() {
    this.password = "";
    this.chars = [];
  }
}

const passwordGeneratorLSManager = new LocalStorageManager<Partial<{ preferences: LSFormValues }>>(
  "password-generator"
);

const charSetFieldNames: (keyof FormValues)[] = [
  FieldNames.includeSymbols,
  FieldNames.includeNumber,
  FieldNames.includeLowercaseChars,
  FieldNames.includeUppercaseChars,
];

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
  const { getValues, handleSubmit, register, watch, setValue, setError, formState, resetField, trigger, control } =
    useForm<FormValues>({
      mode: "onChange",
      defaultValues: getDefaultFormValues({
        [FieldNames.password]: "",
        [FieldNames.passwordLength]: 16,
        [FieldNames.symbols]: SYMBOL_LIST,
        [FieldNames.includeSymbols]: true,
        [FieldNames.includeNumber]: true,
        [FieldNames.includeLowercaseChars]: true,
        [FieldNames.includeUppercaseChars]: true,
        [FieldNames.excludeSymbols]: "",
        [FieldNames.noDuplicateCharacters]: true,
        [FieldNames.autoGenerateOnTheFirstCall]: false,
        [FieldNames.savePreference]: false,
        [FieldNames.autoSelect]: false,
        // [FieldNames.userSymbols]: "",
        // [FieldNames.noSimilarCharacters]: false,
        // [FieldNames.noSequentialCharacters]: false,
        // [FieldNames.excludeSimilarCharacters]: false,
        // [FieldNames.excludeAmbiguousCharacters]: false,
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
  passwordBuilder.setBuilderData(actualFormValues).setMaxAllowedLength();

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
      ) as LSFormValues;

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

  useEffect(() => {
    if (!hasOneOfCharacterSet) {
      setValue(FieldNames.passwordLength, 0);
      trigger(FieldNames.passwordLength);
      return;
    }

    // if (getValues().noDuplicateCharacters && getValues().passwordLength > passwordBuilder.getMaxAllowedLength()) {
    //   setValue(FieldNames.passwordLength, passwordBuilder.getMaxAllowedLength());
    //   trigger(FieldNames.passwordLength);
    // }
  }, [hasOneOfCharacterSet, ...getValues([FieldNames.noDuplicateCharacters, FieldNames.excludeSymbols])]);

  return (
    <form className={cn(styles["password-generator"], className)} onSubmit={handleSubmit(onSubmit)}>
      <Row className={styles.rowPasswordLength}>
        <Description>Password Length:</Description>
        <Controller
          name={FieldNames.passwordLength}
          control={control}
          defaultValue={defaultValues?.passwordLength}
          rules={{
            required: {
              value: true,
              message: "Password Length is required",
            },
            validate: {
              maxPasswordLength: (value) => {
                return value <= passwordBuilder.getMaxAllowedLength();
              },
            },
          }}
          render={({ field }) => (
            <Input
              type='number'
              min={0}
              {...field}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
                <Error>
                  With selected noDuplicateCharacters, max password length restricted to{" "}
                  <u>
                    <b>{passwordBuilder.getMaxAllowedLength()}</b>
                  </u>
                </Error>
                <Button
                  type='button'
                  onClick={() => {
                    setValue(FieldNames.passwordLength, passwordBuilder.getMaxAllowedLength());
                    trigger(FieldNames.passwordLength);
                  }}>
                  Set {passwordBuilder.getMaxAllowedLength()} length
                </Button>
              </>
            )}
          </div>
        )}
      </Row>

      <div className={cn(styles.characterSet, { [styles.noCharacterSet]: !hasOneOfCharacterSet })}>
        <Row>
          <Description>Include Numbers:</Description>
          <Label>
            <Controller
              name={FieldNames.includeNumber}
              control={control}
              defaultValue={defaultValues?.includeNumber}
              render={({ field: { onChange, value, ...restFieldProps } }) => (
                <Input
                  {...restFieldProps}
                  type='checkbox'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange(e);
                    trigger(FieldNames.passwordLength);
                  }}
                  checked={value}
                />
              )}
            />
            <Description>( e.g. {NUMBER_LIST} )</Description>
          </Label>
        </Row>

        <Row>
          <Description>Include Lowercase Characters:</Description>
          <Label>
            <Controller
              name={FieldNames.includeLowercaseChars}
              control={control}
              defaultValue={defaultValues?.includeLowercaseChars}
              render={({ field: { onChange, value, ...restFieldProps } }) => (
                <Input
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
            <Description>( e.g. {LOWERCASE_CHAR_LIST} )</Description>
          </Label>
        </Row>

        <Row>
          <Description>Include Uppercase Characters:</Description>
          <Label>
            <Controller
              name={FieldNames.includeUppercaseChars}
              control={control}
              defaultValue={defaultValues?.includeUppercaseChars}
              render={({ field: { onChange, value, ...restFieldProps } }) => (
                <Input
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
            <Description>( e.g. {UPPERCASE_CHAR_LIST} )</Description>
          </Label>
        </Row>

        <Row className={styles.rowSymbols}>
          <Description>Include Symbols:</Description>
          <div className={styles.controlSymbols}>
            {/* TODO: validation error */}
            <Controller
              name={FieldNames.includeSymbols}
              control={control}
              defaultValue={defaultValues?.includeSymbols}
              render={({ field: { onChange, value, ...restFieldProps } }) => (
                <Input
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
                <Input
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
                />
              )}
            />
          </div>
          {errors.symbols?.type === "hasValue" && (
            <Error>This field can not be empty with "Include Symbols" checked</Error>
          )}
          {errors.symbols?.type === "containsUniqueSymbols" && <Error>All symbols should be unique</Error>}
        </Row>

        {!hasOneOfCharacterSet && <Error>One of character sets should be chosen</Error>}
      </div>

      <Row>
        <Description>No Duplicate Characters:</Description>
        <Label>
          <Controller
            name={FieldNames.noDuplicateCharacters}
            control={control}
            defaultValue={defaultValues?.noDuplicateCharacters}
            render={({ field: { onChange, value, ...restFieldProps } }) => (
              <Input
                {...restFieldProps}
                type='checkbox'
                checked={value}
                onChange={(e) => {
                  onChange(e);
                  trigger([FieldNames.passwordLength, FieldNames.symbols]);
                }}
              />
            )}
          />
          <Description>( don't use the same character more than once )</Description>
        </Label>
      </Row>

      <Row>
        <Description>Auto Generate On The First Call:</Description>
        <Label>
          <Input type='checkbox' {...register(FieldNames.autoGenerateOnTheFirstCall)} />
          <Description>( generate passwords automatically when you open this page )</Description>
        </Label>
      </Row>

      <Row>
        <Description>Auto-Select:</Description>
        <Label>
          <Input type='checkbox' {...register(FieldNames.autoSelect)} />
          <Description>( select the password automatically ):</Description>
        </Label>
      </Row>

      <Row>
        <Description>Save My Preference:</Description>
        <Label>
          <Input type='checkbox' {...register(FieldNames.savePreference)} />
          <Description>( save all the settings above for later use )</Description>
        </Label>
      </Row>

      <Row className={styles.rowGenerate}>
        <Button type='submit' ref={generateBtnRef} disabled={!isValid || !hasOneOfCharacterSet}>
          Generate
        </Button>
      </Row>

      <Row className={styles.rowPasswordResult}>
        <Description>Your new password:</Description>

        <div className={styles.passwordResultControls}>
          <Button
            type='button'
            onClick={() => {
              if (getValues().password.length) {
                passwordInputRef.current?.select();
                copyTextToClipboard(getValues().password);
              }
            }}>
            Copy
          </Button>

          <Controller
            name={FieldNames.password}
            control={control}
            defaultValue={defaultValues?.password}
            render={({ field }) => <Textarea rows={6} {...field} ref={passwordInputRef} />}
          />
        </div>
      </Row>

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
