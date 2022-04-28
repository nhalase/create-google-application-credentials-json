# Create a GOOGLE_APPLICATION_CREDENTIALS.json temp file

This action writes the `GOOGLE_APPLICATION_CREDENTIALS` input value to a temp .json file.

## Inputs

## `GOOGLE_APPLICATION_CREDENTIALS`

**Required** The actual `GOOGLE_APPLICATION_CREDENTIALS` contents to be written to the temp .json file.

## Outputs

## `GOOGLE_APPLICATION_CREDENTIALS_JSON`

The path to the `GOOGLE_APPLICATION_CREDENTIALS.json` file created.

## Example usage

```yml
uses: actions/create-google-application-credentials-json@v1
with:
  GOOGLE_APPLICATION_CREDENTIALS: 'P@ssw0rd'
```
