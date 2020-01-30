# mongoimport -d kdict -c entries --file 'kdict_dump.json' --jsonArray # --stopOnError
$scriptDir = (Split-Path -Path $MyInvocation.MyCommand.Definition -Parent)

# $scriptDir = $scriptDir.parent
$scriptDir= (get-item $scriptDir).parent
Write-Host $scriptDir

$env:vocaboScriptFolderPath = $scriptDir

logstash.cmd -f "$scriptDir/scripts/kengdic.logstash.conf"