### Bashrc commandline helpers

##### Show png-file png-info metadata (stable-diffusion write there parameters)

```
function identify_with_grep() {
    filename="$1"
    n="${2:-5}"
    identify -verbose "$filename" | grep -A "$n" parameters
}
alias sd_imginfo=identify_with_grep
```

##### Convert png to jpg and remove metadata

```
convert_png_to_jpg() {
  if [ "$#" -ne 1 ]; then
    echo "Usage: png2jpg <input.png>"
    return 1
  fi

  local input="$1"
  local output="${input%.*}.jpg"

  # Convert to JPEG with sips
  sips -s format jpeg -s formatOptions best "$input" --out "$output"

  # Remove metadata with exiftool
  exiftool -all= "$output"
}
alias sd_convert="convert_png_to_jpg"
```
