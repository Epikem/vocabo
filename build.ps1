$block = {
  Param([string] $file)
  "[Do something]"
}
Get-Location | Write-Host
$buildClient = {
  docker build ./client -t epikem/vocabo-client
}
$buildServer = {
  docker build ./server -t epikem/vocabo-server
}
#Remove all jobs
Get-Job | Remove-Job
$MaxThreads = 4
#Start the jobs. Max 4 jobs running simultaneously.
# foreach($file in $files){
#   While ($(Get-Job -state running).count -ge $MaxThreads){
#       Start-Sleep -Milliseconds 3
#   }
#   Start-Job -Scriptblock $Block -ArgumentList $file
# }
Start-Job -ScriptBlock $buildClient
Start-Job -ScriptBlock $buildServer
#Wait for all jobs to finish.
While ($(Get-Job -State Running).count -gt 0){
  start-sleep 1
}
#Get information from each job.
foreach($job in Get-Job){
  $info= Receive-Job -Id ($job.Id)
  Write-Host $info
}
#Remove all jobs created.
Get-Job | Remove-Job