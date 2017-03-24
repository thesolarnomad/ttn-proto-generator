# Generator for Data functions for The Things Network based on protobuf

```
Usage: ttn-proto-generator -p [string] -m [string] -o [string]

Options:
  -p, --proto-file        The proto definition file            [required]
  -m, --message           The message path                     [required]
  -o, --output-directory  The output directory             [Default: "."]
  -h, --help              Hilfe anzeigen                        [boolean]
  -v, --version           Version anzeigen                      [boolean]
```

## Example
```bash
ttn-proto-generator \
    -p ./my/message.proto \
    -m com.example.MyMessage
```

Would generate four files from the given Protobuf definition file:
* `Converter.js`
* `Decoder.js`
* `Encoder.js`
* `Validator.js`

That match the respective data functions in the [Things Network Console](https://console.thethingsnetwork.org).
Just take the output and paste it into the console.
