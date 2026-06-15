param(
  [int]$Port = 5173
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Node = "C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

Set-Location -LiteralPath $Root
$env:PORT = [string]$Port
$Log = Join-Path $Root "server-runtime.log"
& $Node server.js *>> $Log
