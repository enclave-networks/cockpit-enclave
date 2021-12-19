Name: cockpit-enclave
Version: %{version}
Release: 1%{?dist}
Summary: An Enclave plugin for Cockpit
BuildArch: noarch

License: GPL

Source0: %{name}-%{version}.tar.gz

Requires: cockpit bash

%description
A plugin to montiro enclave status in cockpit

%prep
%setup -q

%install
rm -rf $RPM_BUILD_ROOT
mkdir -p $RPM_BUILD_ROOT/%{_datadir}/cockpit/enclave
cp -r * $RPM_BUILD_ROOT/%{_datadir}/cockpit/enclave

%files
%{_datadir}/cockpit/enclave/*



%changelog
* Wed Dec 08 2021 Thomas Soulard <t.soulard@live.co.uk>
- First version being packaged
