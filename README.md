# Generator for Data functions for The Things Network based on protobuf

```
Usage: ttn-proto-generator -p [string] -m [string] -o [string]

Options:
  -p, --proto-file        The proto definition file            [required]
  -m, --message           The message path                     [required]
  -o, --output-directory  The output directory             [Default: "."]
  -h, --help              Hilfe anzeigen                        [boolean]
  -v, --version           Version anzeigen                      [boolean]

Example:
  ttn-proto-generator \
    -p ./my/message.proto \
    -m com.example.MyMessage
```