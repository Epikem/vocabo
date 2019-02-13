# mongoimport -d kdict -c entries --file 'kdict_dump.json' --jsonArray # --stopOnError
$scriptDir = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent

Write-Host $scriptDir

# Resolve-Path -Path '.\'
$env:vocaboScriptFolderPath = $scriptDir

logstash.cmd -f "$scriptDir/kengdic.logstash.conf"