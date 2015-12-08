#!/bin/bash


node slackclient.js --channel build --server_name docker7 --tc_build_id tc1337 --saas_id saaas1337
node slackclient.js --channel release --server_name "test-app" --tc_build_id tc1337 --saas_id saaas1337
node slackclient.js --channel release --server_name app --tc_build_id tc1337 --saas_id saaas1337


node ratchetclient.js --operation vms --verb POST --vm_name dockerino --owner tvanek --channel "build" --tc_build_id tcbuild1000 --expire 5
node ratchetclient.js --operation harnesses --verb POST --vm_name dockerino --owner tvanek --channel "build" --tc_build_id tcbuild1000
